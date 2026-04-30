import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUp, ShoppingCart, MessageSquareQuote, X } from "lucide-react";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";
import StarRatingComponent from "../common/star-rating";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId,
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Maximum stock reached: ${getQuantity} items in cart`,
            variant: "destructive",
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Added to cart successfully!" });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({ title: "Thank you for your review!" });
      }
    });
  }

  useEffect(() => {
    if (productDetails?._id) {
      dispatch(getReviews(productDetails._id));
    }
  }, [dispatch, productDetails?._id]);

  // Calculate overall average rating
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 p-0 sm:p-6 lg:p-10 
                   max-w-[100vw] sm:max-w-[90vw] lg:max-w-[80vw] 
                   max-h-[92vh] sm:max-h-[90vh] overflow-y-auto 
                   rounded-t-[2rem] sm:rounded-3xl border-none shadow-2xl"
      >
        <Button
          onClick={handleDialogClose}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full bg-white/60 backdrop-blur-sm sm:hidden"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="relative h-[300px] sm:h-auto bg-gray-50 flex items-center justify-center border-b sm:border-none">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full h-full object-contain p-6"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-0">
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-2xl sm:text-3xl font-black text-gray-900">
                {productDetails?.title}
              </DialogTitle>
            </DialogHeader>

            {/* FIXED: Overall rating display for the product */}
            <div className="flex items-center gap-3">
              <StarRatingComponent rating={averageReview} />
              <span className="text-sm font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                {averageReview.toFixed(1)}
              </span>
            </div>

            <p className="text-gray-500 text-base sm:text-lg">
              {productDetails?.description}
            </p>

            <div className="flex items-center gap-4 text-2xl sm:text-3xl font-black">
              <p
                className={
                  productDetails?.salePrice > 0
                    ? "line-through text-gray-300 text-lg"
                    : "text-blue-600"
                }
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 && (
                <p className="text-red-500">${productDetails?.salePrice}</p>
              )}
            </div>

            <Button
              className={`w-full h-14 rounded-2xl text-lg font-bold gap-2 ${
                productDetails?.totalStock === 0
                  ? "bg-gray-200"
                  : "bg-blue-600 shadow-lg"
              }`}
              disabled={productDetails?.totalStock === 0}
              onClick={() =>
                handleAddToCart(productDetails?._id, productDetails?.totalStock)
              }
            >
              <ShoppingCart size={20} />
              {productDetails?.totalStock === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>
          </div>

          <Separator className="my-8" />

          <div className="flex-1 pb-10">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <MessageSquareQuote className="text-blue-600" /> Reviews
            </h2>
            <div className="grid gap-4">
              {reviews?.map((reviewItem) => (
                <div
                  key={reviewItem?._id}
                  className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-600 text-white font-bold">
                      {reviewItem?.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <h3 className="font-bold text-gray-900">
                      {reviewItem?.userName}
                    </h3>
                    {/* FIXED: Showing individual review rating instead of overall average */}
                    <StarRatingComponent rating={reviewItem?.reviewValue} />
                    <p className="text-sm text-gray-600 mt-1">
                      {reviewItem.reviewMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-blue-50/30 rounded-3xl border border-blue-100 space-y-4">
              <Label className="text-blue-900 font-black">
                Share your feedback
              </Label>
              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
              <Input
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write your review..."
                className="bg-white"
              />
              <Button
                className="w-full rounded-xl bg-blue-600 font-bold"
                disabled={reviewMsg.trim() === "" || rating === 0}
                onClick={handleAddReview}
              >
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductListing() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.shopProducts);

  // FIXED: Automatically open dialog when product details are fetched
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fragment>
      {showBackToTop && (
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-10 z-[9999] rounded-full w-14 h-14 shadow-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center p-0 border-2 border-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </Button>
      )}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </Fragment>
  );
}

export default ProductListing;
