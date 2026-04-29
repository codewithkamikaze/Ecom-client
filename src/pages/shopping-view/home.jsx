import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Wrench,
  BatteryCharging,
  Hammer,
  Package,
  Megaphone,
  Drill,
  HardHat,
  Truck,
  Box,
  Factory,
  Layers,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "power-tools", label: "Power Tools", icon: Wrench },
  { id: "battery-tools", label: "Battery Tools", icon: BatteryCharging },
  { id: "hand-tools", label: "Hand Tools", icon: Hammer },
  { id: "spare-parts", label: "Spare Parts", icon: Package },
  { id: "advertising", label: "Advertising", icon: Megaphone },
];

const brandsWithIcon = [
  { id: "ingco", label: "Ingco", icon: Drill },
  { id: "total", label: "Total", icon: HardHat },
  { id: "antiefix", label: "Antiefix", icon: Truck },
  { id: "bosch", label: "Bosch", icon: Box },
  { id: "dca", label: "DCA", icon: Factory },
  { id: "generic", label: "Tools", icon: Layers },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);

  function handleNavigateToListingPage(item, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [item.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(id) {
    dispatch(fetchProductDetails(id));
  }

  function handleAddtoCart(id) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: id,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Added to Cart",
          description: "Product successfully added to your shopping bag.",
          variant: "success",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    if (!featureImageList?.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    );
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* --- HERO SLIDER --- */}
      <div className="relative w-full h-[400px] md:h-[650px] bg-gray-100 overflow-hidden">
        {featureImageList?.map((slide, index) => (
          <img
            key={slide?._id || index}
            src={slide?.image}
            alt="Feature"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          />
        ))}
        {/* Slider Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prev) =>
                  (prev - 1 + featureImageList.length) %
                  featureImageList.length,
              )
            }
            className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/50 text-white"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % featureImageList.length)
            }
            className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/50 text-white"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </Button>
        </div>
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {featureImageList.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-blue-600" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- CATEGORIES SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Shop by Category
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((item) => (
              <Card
                key={item.id}
                onClick={() => handleNavigateToListingPage(item, "category")}
                className="group border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-[2rem] cursor-pointer bg-gray-50 hover:bg-white"
              >
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <div className="p-4 rounded-2xl bg-white group-hover:bg-blue-50 transition-colors shadow-sm">
                    <item.icon className="w-12 h-12 text-blue-600" />
                  </div>
                  <span className="font-black text-gray-800 mt-4 text-lg">
                    {item.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- BRANDS SECTION --- */}
      <section className="py-20 bg-gray-900 text-white rounded-t-[3rem] -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Leading Brands</h2>
            <p className="text-gray-400">
              We source only the highest quality industrial tools.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brandsWithIcon.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNavigateToListingPage(item, "brand")}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 border border-gray-700 shadow-xl">
                  <item.icon className="w-10 h-10 text-gray-400 group-hover:text-white" />
                </div>
                <span className="mt-4 font-bold text-gray-300 group-hover:text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED PRODUCTS --- */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                  Top Rated
                </span>
              </div>
              <h2 className="text-4xl font-black text-gray-900">
                Featured Products
              </h2>
            </div>
            <Button
              onClick={() => navigate("/shop/listing")}
              variant="link"
              className="text-blue-600 font-bold text-lg"
            >
              View All Products →
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productList?.slice(0, 8).map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
