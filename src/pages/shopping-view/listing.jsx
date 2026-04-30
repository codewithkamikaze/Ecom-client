import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon, LayoutGrid } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { toast } = useToast();
  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(sectionId, option) {
    setFilters((prev) => {
      const updated = { ...prev };
      if (!updated[sectionId]) {
        updated[sectionId] = [option];
      } else {
        if (updated[sectionId].includes(option)) {
          updated[sectionId] = updated[sectionId].filter(
            (item) => item !== option,
          );
        } else {
          updated[sectionId].push(option);
        }
      }
      sessionStorage.setItem("filters", JSON.stringify(updated));
      return updated;
    });
  }

  function handleGetProductDetails(id) {
    dispatch(fetchProductDetails(id));
  }

  function handleAddtoCart(productId, totalStock) {
    let items = cartItems?.items || [];
    const existingItem = items.find((i) => i.productId === productId);

    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast({
        title: `Limit reached`,
        description: `Only ${totalStock} items available in stock.`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Added to Cart",
          variant: "success",
        });
      }
    });
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    const storedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    setFilters(storedFilters);
  }, [categorySearchParam]);

  useEffect(() => {
    const query = createSearchParamsHelper(filters);
    if (Object.keys(filters).length > 0) {
      setSearchParams(new URLSearchParams(query));
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }),
    );
  }, [dispatch, filters, sort]);

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-3 md:p-10 bg-[#fbfbfb] min-h-screen">
      {/* Sidebar Filter - Hidden on very small screens or optimized */}
      <aside className="w-full md:w-[250px] lg:w-[280px] shrink-0">
        <div className="md:sticky md:top-24 bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-gray-100 p-2">
          {/* نصيحة: يفضل عمل الفلتر كـ "Accordion" في الجوال لتقليل المساحة */}
          <ProductFilter filters={filters} handleFilter={handleFilter} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
        {/* Header Section - Optimized for Mobile */}
        <div className="p-4 md:p-6 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg md:text-xl font-black text-gray-900">
                Products
              </h2>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold rounded-full">
              {productList?.length || 0} Items
            </span>
          </div>

          {/* Sort Button - Full width on mobile */}
          <div className="w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-xl font-bold flex gap-2 border-gray-200 h-10 md:h-12"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl p-2 w-[200px]"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem
                      key={item.id}
                      value={item.id}
                      className="rounded-lg font-medium cursor-pointer"
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Products Grid - CRITICAL CHANGES HERE */}
        <div className="p-3 md:p-6">
          {productList && productList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 md:gap-12">
              {productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center">
              {/* ... (نفس الـ No products found) */}
            </div>
          )}
        </div>
      </main>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
