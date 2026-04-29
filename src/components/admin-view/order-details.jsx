import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Handle order status update
  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status }),
    ).then((data) => {
      if (data?.payload?.success) {
        // Refresh data after successful update
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] rounded-2xl">
      <div className="grid gap-6">
        {/* Order Metadata Section */}
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-semibold text-gray-600">Order ID</p>
            <Label className="font-mono text-blue-600">
              {orderDetails?._id}
            </Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-gray-600">Order Date</p>
            <Label>{orderDetails?.orderDate?.split("T")[0]}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-gray-600">Order Price</p>
            <Label className="text-green-600 font-bold">
              ${orderDetails?.totalAmount}
            </Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-gray-600">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-gray-600">Payment Status</p>
            <Label className="capitalize">{orderDetails?.paymentStatus}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-gray-600">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 rounded-full font-bold shadow-sm ${
                  orderDetails?.orderStatus === "confirmed" ||
                  orderDetails?.orderStatus === "delivered"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : orderDetails?.orderStatus === "rejected"
                      ? "bg-red-100 text-red-700 hover:bg-red-100"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator />

        {/* Purchased Items List */}
        <div className="grid gap-4">
          <div className="font-bold text-gray-800">Purchased Items</div>
          <ul className="grid gap-3">
            {orderDetails?.cartItems?.length > 0 &&
              orderDetails.cartItems.map((item, index) => (
                <li
                  key={item._id || index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100"
                >
                  <span className="font-medium text-gray-700">
                    {item.title}
                  </span>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>Qty: {item.quantity}</span>
                    <span className="font-semibold text-gray-700">
                      ${item.price}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Shipping and Contact Information */}
        <div className="grid gap-4 bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-200">
          <div className="font-bold text-gray-800">Shipping Info</div>
          <div className="grid gap-1 text-sm text-gray-600">
            <span className="font-bold text-gray-900">{user?.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>
              {orderDetails?.addressInfo?.city},{" "}
              {orderDetails?.addressInfo?.pincode}
            </span>
            <span>Phone: {orderDetails?.addressInfo?.phone}</span>
            {orderDetails?.addressInfo?.notes && (
              <span className="mt-2 text-xs italic">
                Note: {orderDetails?.addressInfo?.notes}
              </span>
            )}
          </div>
        </div>

        {/* Status Update Form */}
        <div className="mt-2 pt-4 border-t">
          <CommonForm
            formControls={[
              {
                label: "Update Process Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
