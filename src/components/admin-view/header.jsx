import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm sticky top-0 z-10">
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 border-none shadow-none"
        variant="outline"
      >
        <AlignJustify className="w-5 h-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-xl px-5 py-2 text-sm font-bold bg-white text-red-600 border border-red-100 hover:bg-red-50 shadow-sm transition-all active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
