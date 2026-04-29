import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/BOL.png";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { Package, MapPin } from "lucide-react";

function ShoppingAccount() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Banner Section */}
      <div className="relative h-[250px] w-full overflow-hidden bg-gray-900">
        <img
          src={accImg}
          className="h-full w-full object-cover opacity-60 transition-transform duration-700 hover:scale-105"
          alt="Account Banner"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
            My Account
          </h1>
          <p className="text-gray-200 font-medium">
            Manage your orders and shipping details
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 mb-12">
        <div className="flex flex-col rounded-[2.5rem] border-none bg-white p-6 md:p-10 shadow-xl shadow-gray-200/50">
          <Tabs defaultValue="orders" className="w-full">
            {/* Tabs Navigation */}
            <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8 bg-gray-100 p-1 rounded-2xl h-14">
              <TabsTrigger
                value="orders"
                className="rounded-xl font-bold flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Package className="w-4 h-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="rounded-xl font-bold flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                Addresses
              </TabsTrigger>
            </TabsList>

            {/* Orders Content */}
            <TabsContent value="orders" className="outline-none">
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-2xl font-black text-gray-900">
                    Order History
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Check the status of your recent purchases.
                  </p>
                </div>
                <ShoppingOrders />
              </div>
            </TabsContent>

            {/* Address Content */}
            <TabsContent value="address" className="outline-none">
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-2xl font-black text-gray-900">
                    Shipping Addresses
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Manage where your orders are delivered.
                  </p>
                </div>
                <Address />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
