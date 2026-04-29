import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// Sidebar Menu Configuration
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket className="w-5 h-5" />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck className="w-5 h-5" />,
  },
];

/* ================= MENU ITEMS COMPONENT ================= */
function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation(); // To detect active path

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;

        return (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              if (setOpen) setOpen(false); // Close sidebar on mobile after navigation
            }}
            className={`flex cursor-pointer text-sm font-semibold items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

/* ================= MAIN SIDEBAR COMPONENT ================= */
function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <>
      {/* MOBILE SIDEBAR (Drawer) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-6 border-r-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b pb-4">
              <SheetTitle className="flex gap-2 items-center">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <ChartNoAxesCombined size={24} className="text-white" />
                </div>
                <h1 className="text-xl font-black tracking-tight">
                  Admin Portal
                </h1>
              </SheetTitle>
            </SheetHeader>

            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* DESKTOP SIDEBAR (Static) */}
      <aside className="hidden w-64 flex-col border-r bg-white p-6 lg:flex sticky top-0 h-screen">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2 group mb-4"
        >
          <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-md shadow-blue-100">
            <ChartNoAxesCombined size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-gray-900">
            Admin Portal
          </h1>
        </div>

        <MenuItems />
      </aside>
    </>
  );
}

export default AdminSideBar;
