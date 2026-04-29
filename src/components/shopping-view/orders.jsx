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
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { Eye } from "lucide-react";

/**
 * ShoppingOrders Component
 * Fetches and displays the user's order history in a clean, interactive table.
 */
function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList = [], orderDetails } = useSelector(
    (state) => state.shopOrder,
  );

  // Fetch details for a specific order and trigger the dialog
  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  // Effect: Initial fetch of all orders for the current user
  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  // Effect: Automatically open the dialog when orderDetails are loaded
  useEffect(() => {
    if (orderDetails) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  // Status-based color mapping for Badges
  const statusConfig = {
    confirmed: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    delivered: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden">
      <CardHeader className="bg-gray-50/50 border-b">
        <CardTitle className="text-xl font-black text-gray-800">
          Order History
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 sm:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-bold py-4">Order ID</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Total Amount</TableHead>
                <TableHead className="text-right font-bold pr-6">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow
                    key={orderItem?._id}
                    className="hover:bg-gray-50/50 transition-colors border-b last:border-0"
                  >
                    <TableCell className="font-mono text-xs text-gray-500">
                      {orderItem?._id}
                    </TableCell>

                    <TableCell className="text-sm font-medium">
                      {orderItem?.orderDate
                        ? orderItem.orderDate.split("T")[0]
                        : "-"}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`capitalize font-bold px-3 py-1 rounded-full ${
                          statusConfig[orderItem?.orderStatus] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-black text-gray-900">
                      ${orderItem?.totalAmount ?? 0}
                    </TableCell>

                    <TableCell className="text-right pr-6">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={(open) => {
                          setOpenDetailsDialog(open);
                          if (!open) {
                            dispatch(resetOrderDetails());
                          }
                        }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-xl font-bold gap-2 hover:bg-blue-50 hover:text-blue-600 transition-all"
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          <Eye size={16} />
                          Details
                        </Button>

                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-gray-400 italic"
                  >
                    You haven't placed any orders yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
