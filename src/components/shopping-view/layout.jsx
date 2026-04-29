import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden rounded-lg shadow">
      <ShoppingHeader />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
