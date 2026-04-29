import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { Search, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { searchResults = [] } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const { toast } = useToast();

  useEffect(() => {
    const trimmed = keyword.trim();

    const timer = setTimeout(() => {
      if (trimmed.length > 3) {
        setSearchParams({ keyword: trimmed });
        dispatch(getSearchResults(trimmed));
      } else {
        setSearchParams({});
        dispatch(resetSearchResults());
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [keyword, dispatch, setSearchParams]);

  function handleAddtoCart(productId, totalStock) {
    const items = cartItems?.items || [];
    const existing = items.find((i) => i.productId === productId);

    if (existing && existing.quantity + 1 > totalStock) {
      toast({
        title: "Limit reached",
        description: `Only ${totalStock} units available.`,
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
          title: "Added to cart",
          variant: "success",
        });
      }
    });
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  useEffect(() => {
    if (productDetails) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="container mx-auto min-h-screen md:px-6 px-4 py-12">
      {/* Search Bar Section */}
      <div className="flex flex-col items-center mb-12 space-y-4">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Find Tools
        </h1>
        <p className="text-gray-500 font-medium">
          Search across our professional inventory
        </p>

        <div className="relative w-full max-w-2xl mt-4">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full py-8 pl-14 pr-6 text-lg rounded-[2rem] border-none shadow-2xl shadow-blue-100/50 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
            placeholder="Type tool name, category or brand..."
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-500" />
        </div>
      </div>

      {/* Results Section */}
      {!searchResults?.length && keyword.trim().length > 3 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-50 p-6 rounded-full mb-4">
            <SearchX className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">No results found</h2>
          <p className="text-gray-500 max-w-xs mx-auto">
            We couldn't find anything matching "{keyword}". Check your spelling
            or try another term.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {searchResults.map((item) => (
          <ShoppingProductTile
            key={item._id}
            product={item}
            handleAddtoCart={handleAddtoCart}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
