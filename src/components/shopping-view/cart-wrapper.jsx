import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const totalCartAmount = safeCartItems.reduce((sum, currentItem) => {
    if (!currentItem) return sum;

    const price =
      currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price;

    return sum + price * (currentItem?.quantity || 0);
  }, 0);

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4">
        {safeCartItems.length > 0 ? (
          safeCartItems.map((item) => (
            <UserCartItemsContent
              key={item?.productId || item?._id}
              cartItem={item}
            />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <span className="font-bold">Total</span>
        <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
      </div>

      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

/* ✅ الحل للـ ESLint */
UserCartWrapper.propTypes = {
  cartItems: PropTypes.array,
  setOpenCartSheet: PropTypes.func.isRequired,
};

export default UserCartWrapper;
