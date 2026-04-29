import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ShoppingBag } from "lucide-react";

/**
 * UserCartWrapper Component
 * Handles the sidebar display of cart items, calculates total price, and navigates to checkout.
 */
function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  // Safety check to ensure cartItems is always an array
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  // Calculate the total price dynamically
  const totalCartAmount = safeCartItems.reduce((sum, currentItem) => {
    if (!currentItem) return sum;

    const price =
      currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price;

    return sum + (price || 0) * (currentItem?.quantity || 0);
  }, 0);

  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full bg-white border-l rounded-l-3xl">
      <SheetHeader className="border-b pb-4">
        <SheetTitle className="flex items-center gap-2 text-xl font-black">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
          Your Shopping Cart
        </SheetTitle>
      </SheetHeader>

      {/* Cart Items List Area */}
      <div className="flex-1 mt-6 overflow-y-auto pr-2 scrollbar-hide">
        {safeCartItems.length > 0 ? (
          <div className="space-y-4">
            {safeCartItems.map((item) => (
              <UserCartItemsContent
                key={item?.productId || item?._id}
                cartItem={item}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <div className="bg-gray-50 p-6 rounded-full">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium italic text-sm">
              Your cart is currently empty.
            </p>
          </div>
        )}
      </div>

      {/* Footer Section: Total & Checkout Action */}
      <div className="mt-auto pt-6 border-t space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-semibold">Estimated Total</span>
          <span className="text-2xl font-black text-blue-600">
            ${totalCartAmount.toFixed(2)}
          </span>
        </div>

        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          disabled={safeCartItems.length === 0}
          className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-blue-100 hover:scale-[1.02] transition-transform active:scale-95"
        >
          Proceed to Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
