import { Minus, Plus, Trash2 } from "lucide-react"; // Using Trash2 for a more modern look
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

/**
 * UserCartItemsContent Component
 * Renders an individual cart item row with quantity controls and stock validation.
 */
function UserCartItemsContent({ cartItem }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);

  // Logic to increase/decrease quantity with stock check
  function handleUpdateQuantity(getCartItem, typeOfAction) {
    const getCartItems = cartItems?.items || [];

    if (typeOfAction === "plus") {
      const indexOfCurrentCartItem = getCartItems.findIndex(
        (item) => item.productId === getCartItem?.productId,
      );

      const getCurrentProductIndex = productList?.findIndex(
        (product) => product._id === getCartItem?.productId,
      );

      const currentProduct = productList?.[getCurrentProductIndex];
      const getTotalStock = currentProduct?.totalStock || 0;

      // Prevent adding more than available stock
      if (indexOfCurrentCartItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentCartItem]?.quantity || 0;

        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getTotalStock} items are in stock`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart updated",
        });
      }
    });
  }

  // Handle removing an item completely from the cart
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Item removed from cart",
        });
      }
    });
  }

  // Calculate dynamic price based on sale or regular price
  const displayPrice =
    (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
    cartItem?.quantity;

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-0 border-gray-100">
      {/* Product Image Container */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="h-full w-full object-contain p-2"
        />
      </div>

      {/* Item Details and Controls */}
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
          {cartItem?.title}
        </h3>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-gray-200 rounded-lg p-0.5 shadow-sm">
            <Button
              variant="ghost"
              className="h-7 w-7 rounded-md p-0 hover:bg-gray-100"
              size="icon"
              disabled={cartItem?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-8 text-center text-sm font-bold text-gray-900">
              {cartItem?.quantity}
            </span>

            <Button
              variant="ghost"
              className="h-7 w-7 rounded-md p-0 hover:bg-gray-100"
              size="icon"
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Price and Delete Action */}
      <div className="flex flex-col items-end gap-3">
        <p className="text-sm font-black text-blue-600">
          ${displayPrice.toFixed(2)}
        </p>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
