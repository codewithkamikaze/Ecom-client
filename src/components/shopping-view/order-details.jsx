import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import PropTypes from "prop-types";

function ShoppingOrderDetailsView({ orderDetails = {} }) {
  const { user } = useSelector((state) => state.auth);

  const {
    _id,
    orderDate,
    totalAmount,
    paymentMethod,
    paymentStatus,
    orderStatus,
    cartItems = [],
    addressInfo = {},
  } = orderDetails || {};

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        {/* Order Info */}
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{_id || "-"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDate ? orderDate.split("T")[0] : "-"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${totalAmount ?? 0}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{paymentMethod || "-"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{paymentStatus || "-"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Badge
              className={`py-1 px-3 ${
                orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
              }`}
            >
              {orderStatus || "-"}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Cart Items */}
        <div className="grid gap-4">
          <div className="font-medium">Order Details</div>

          <ul className="grid gap-3">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <li
                  key={item?._id || index}
                  className="flex items-center justify-between"
                >
                  <span>Title: {item?.title}</span>
                  <span>Qty: {item?.quantity}</span>
                  <span>Price: ${item?.price}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500">No items found</li>
            )}
          </ul>
        </div>

        {/* Shipping Info */}
        <div className="grid gap-4">
          <div className="font-medium">Shipping Info</div>

          <div className="grid gap-0.5 text-muted-foreground">
            <span>{user?.userName || "-"}</span>
            <span>{addressInfo?.address || "-"}</span>
            <span>{addressInfo?.city || "-"}</span>
            <span>{addressInfo?.pincode || "-"}</span>
            <span>{addressInfo?.phone || "-"}</span>
            <span>{addressInfo?.notes || "-"}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

ShoppingOrderDetailsView.propTypes = {
  orderDetails: PropTypes.object,
};

export default ShoppingOrderDetailsView;
