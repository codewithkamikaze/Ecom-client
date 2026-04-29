import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Package, Truck, CreditCard, Calendar } from "lucide-react";

/**
 * ShoppingOrderDetailsView
 * Provides a comprehensive summary of an order, including items, shipping, and payment status.
 */
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

  // Color mapping for order status badges
  const statusColors = {
    confirmed: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    delivered: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <DialogContent className="sm:max-w-[600px] rounded-3xl overflow-y-auto max-h-[90vh]">
      <DialogHeader className="border-b pb-4">
        <DialogTitle className="text-2xl font-black flex items-center gap-2">
          <Package className="text-blue-600" />
          Order Details
        </DialogTitle>
      </DialogHeader>

      <div className="grid gap-8 py-4">
        {/* SECTION 1: CORE ORDER INFO */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              Order ID
            </p>
            <p className="text-sm font-mono font-medium truncate">
              {_id || "-"}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              Date
            </p>
            <div className="flex items-center justify-end gap-1 text-sm font-medium">
              <Calendar size={14} />
              {orderDate ? orderDate.split("T")[0] : "-"}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              Status
            </p>
            <Badge
              variant="outline"
              className={`capitalize font-bold ${statusColors[orderStatus] || "bg-gray-100 text-gray-700"}`}
            >
              {orderStatus || "Pending"}
            </Badge>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              Total Amount
            </p>
            <p className="text-xl font-black text-blue-600">
              ${totalAmount ?? 0}
            </p>
          </div>
        </div>

        {/* SECTION 2: ITEMS LIST */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Package size={18} /> Items Summary
          </h3>
          <div className="border rounded-2xl overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <li
                    key={item?._id || index}
                    className="p-4 flex items-center justify-between hover:bg-gray-50/50"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-900">
                        {item?.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        Quantity: {item?.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-gray-700">
                      ${item?.price}
                    </span>
                  </li>
                ))
              ) : (
                <li className="p-4 text-center text-sm text-gray-400">
                  No items in this order
                </li>
              )}
            </ul>
          </div>
        </div>

        <Separator />

        {/* SECTION 3: SHIPPING & PAYMENT */}
        <div className="grid sm:grid-cols-2 gap-8">
          {/* Shipping Column */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Truck size={18} /> Shipping To
            </h3>
            <div className="text-sm text-gray-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="font-bold text-gray-900 capitalize">
                {user?.userName}
              </p>
              <p>{addressInfo?.address}</p>
              <p>
                {addressInfo?.city}, {addressInfo?.pincode}
              </p>
              <p className="pt-1 flex items-center gap-1">
                <small>📞</small> {addressInfo?.phone}
              </p>
              {addressInfo?.notes && (
                <p className="mt-2 pt-2 border-t text-xs italic text-gray-400">
                  Note: {addressInfo.notes}
                </p>
              )}
            </div>
          </div>

          {/* Payment Column */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <CreditCard size={18} /> Payment Info
            </h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Method:</span>
                <span className="font-medium uppercase">
                  {paymentMethod || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status:</span>
                <Badge
                  variant="secondary"
                  className="font-bold text-[10px] uppercase tracking-widest"
                >
                  {paymentStatus || "Unpaid"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
