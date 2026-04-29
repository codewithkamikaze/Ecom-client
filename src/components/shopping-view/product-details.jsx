import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { ShoppingCart, MessageSquareQuote } from "lucide-react";

/**
 * ProductDetailsDialog Component
 * Manages the detailed product view, including cart management and user reviews.
 */
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

  // Handle adding product to cart with inventory check
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
            title: `Maximum stock reached: ${getQuantity} items already in cart`,
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

  // Reset state on dialog close
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  // Submit a new user review
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

  // Calculate Average Rating
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10 max-w-[95vw] lg:max-w-[80vw] rounded-3xl overflow-hidden">
        {/* Left Side: Product Image */}
        <div className="relative group overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Right Side: Product Info & Reviews */}
        <div className="flex flex-col h-full max-h-[80vh] overflow-y-auto pr-2 scrollbar-hide">
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black text-gray-900 leading-tight">
                {productDetails?.title}
              </DialogTitle>
            </DialogHeader>

            <p className="text-gray-500 text-lg leading-relaxed">
              {productDetails?.description}
            </p>

            <div className="flex items-center gap-4">
              <p
                className={`text-3xl font-black text-blue-600 ${productDetails?.salePrice > 0 ? "line-through text-gray-300 text-xl" : ""}`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 && (
                <p className="text-3xl font-black text-red-500">
                  ${productDetails?.salePrice}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <StarRatingComponent rating={averageReview} />
              <span className="text-sm font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                {averageReview.toFixed(1)}
              </span>
            </div>

            <Button
              className={`w-full h-14 rounded-2xl text-lg font-bold gap-2 transition-all ${
                productDetails?.totalStock === 0
                  ? "bg-gray-200"
                  : "shadow-lg shadow-blue-100 hover:scale-[1.01]"
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

          {/* Reviews Section */}
          <div className="flex-1">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <MessageSquareQuote className="text-blue-600" /> Reviews
            </h2>

            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, index) => (
                  <div
                    key={reviewItem?._id || index}
                    className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100"
                  >
                    <Avatar className="w-10 h-10 ring-2 ring-white shadow-sm">
                      <AvatarFallback className="bg-blue-600 text-white font-bold">
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <h3 className="font-bold text-gray-900">
                        {reviewItem?.userName}
                      </h3>
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                      <p className="text-sm text-gray-600 mt-1">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-gray-400 italic">
                  No reviews yet. Be the first to share your thoughts!
                </p>
              )}
            </div>

            {/* Write a Review Section */}
            <div className="mt-8 p-6 bg-blue-50/30 rounded-3xl border border-blue-100 space-y-4">
              <Label className="text-blue-900 font-black">
                Share your feedback
              </Label>
              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
              <Input
                className="bg-white border-blue-100 focus:ring-blue-200"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="What did you think about this product?"
              />
              <Button
                className="w-full rounded-xl font-bold bg-blue-600 hover:bg-blue-700"
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === "" || rating === 0}
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

export default ProductDetailsDialog;
