import AdminOrdersView from "@/components/admin-view/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

function AdminOrders() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            Order Management
          </h1>
          <p className="text-gray-500 font-medium">
            Monitor, track, and manage all incoming customer purchases.
          </p>
        </div>
      </div>

      {/* Orders View Container */}
      <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-6">
          <CardTitle className="text-xl font-black text-gray-800">
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* p-0 allows the table inside AdminOrdersView to flush against the edges if needed */}
          <AdminOrdersView />
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminOrders;
