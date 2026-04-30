import Address from "@/components/shopping-view/address";
import img from "../../assets/BOL.png";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Truck, ShoppingBag } from "lucide-react";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0,
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Address not selected",
        description: "Please select a shipping address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Banner */}
      <div className="relative h-[250px] w-full overflow-hidden bg-gray-900">
        <img
          src={img}
          className="h-full w-full object-cover opacity-70"
          alt="Checkout Banner"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <ShoppingBag className="w-10 h-10" />
            Checkout
          </h1>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 p-6">
        {/* Left Side: Address Selection */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-black text-gray-900">
              Shipping Details
            </h2>
          </div>
          <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-50">
            <Address
              selectedId={currentSelectedAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-black text-gray-900">Order Summary</h2>
          </div>
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-50">
            <div className="flex flex-col gap-5 max-h-[400px] overflow-auto pr-2 custom-scrollbar">
              {cartItems?.items?.map((item) => (
                <UserCartItemsContent
                  key={item.productId || item._id}
                  cartItem={item}
                />
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center text-gray-500">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">${totalCartAmount}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span className="font-medium">Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xl font-black text-gray-900">
                  Grand Total
                </span>
                <span className="text-2xl font-black text-blue-600">
                  ${Number(totalCartAmount).toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              onClick={handleInitiatePaypalPayment}
              className="mt-8 w-full h-14 rounded-2xl text-lg font-black shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
              disabled={isPaymentStart}
            >
              {isPaymentStart ? "Processing Payment..." : "Proceed to PayPal"}
            </Button>

            <p className="text-center text-xs text-gray-400 mt-4 font-medium italic">
              Secure SSL Encrypted Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
