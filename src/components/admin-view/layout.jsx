import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-50/50">
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />

        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
