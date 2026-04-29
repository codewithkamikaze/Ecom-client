import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  // Fetch detailed information for a specific order
  function handleFetchOrderDetails(orderId) {
    setSelectedOrderId(orderId);
    dispatch(getOrderDetailsForAdmin(orderId));
  }

  // Initial data fetch on component mount
  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  return (
    <Card className="shadow-lg border-none rounded-2xl overflow-hidden">
      <CardHeader className="bg-gray-50/50 border-b">
        <CardTitle className="text-xl font-bold text-gray-800">
          Order Management
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-bold">Order ID</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Total Price</TableHead>
              <TableHead className="text-right font-bold px-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow
                    key={orderItem._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="font-mono text-sm text-blue-600">
                      {orderItem?._id}
                    </TableCell>

                    <TableCell className="text-gray-600">
                      {orderItem?.orderDate?.split("T")[0]}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`py-1 px-3 rounded-full font-semibold shadow-sm ${
                          orderItem?.orderStatus === "confirmed" ||
                          orderItem?.orderStatus === "delivered"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : orderItem?.orderStatus === "rejected"
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-bold text-gray-800">
                      ${orderItem?.totalAmount}
                    </TableCell>

                    <TableCell className="text-right px-6">
                      <Dialog
                        open={selectedOrderId === orderItem?._id}
                        onOpenChange={() => {
                          setSelectedOrderId(null);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          variant="outline"
                          className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>

                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
