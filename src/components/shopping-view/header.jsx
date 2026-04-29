import {
  HousePlug,
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
  ChevronRight,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

/* ================= 1. MENU ITEMS COMPONENT ================= */

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");

    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`),
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col gap-2 lg:mb-0 lg:items-center lg:flex-row lg:gap-6">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={menuItem.id}
          onClick={() => handleNavigate(menuItem)}
          className="text-lg lg:text-sm font-semibold cursor-pointer p-4 lg:p-0 rounded-xl flex items-center justify-between lg:justify-start hover:bg-blue-50 lg:hover:bg-transparent hover:text-blue-600 transition-all active:scale-95 lg:active:scale-100"
        >
          {menuItem.label}
          <ChevronRight className="w-5 h-5 lg:hidden text-gray-300" />
        </Label>
      ))}
    </nav>
  );
}

/* ================= 2. RIGHT CONTENT COMPONENT ================= */

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  const cartCount = cartItems?.items?.length || 0;
  const firstLetter = user?.userName?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet
        open={openCartSheet}
        onOpenChange={(open) => setOpenCartSheet(open)}
      >
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative rounded-full h-11 w-11 border-gray-200 shadow-sm"
        >
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
            {cartCount}
          </span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items || []}
        />
      </Sheet>

      <div className="hidden lg:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black cursor-pointer ring-2 ring-offset-2 ring-gray-100 shadow-md">
              <AvatarFallback className="bg-black text-white font-extrabold text-sm">
                {firstLetter}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            className="w-56 mt-2 rounded-xl shadow-xl border-gray-100"
          >
            <DropdownMenuLabel className="font-bold text-gray-500 text-xs uppercase tracking-wider">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/shop/account")}
              className="py-2 cursor-pointer rounded-lg"
            >
              <UserCog className="mr-2 h-4 w-4 text-blue-600" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="py-2 cursor-pointer rounded-lg text-red-600 focus:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="lg:hidden flex flex-col gap-3 border-t pt-6 mt-2">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <Avatar className="bg-blue-600 h-12 w-12 shadow-inner">
            <AvatarFallback className="text-white font-bold text-xl">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 leading-none">
              {user?.userName}
            </span>
            <span className="text-xs text-gray-500 mt-1">Logged in</span>
          </div>
        </div>
        <Button
          onClick={() => navigate("/shop/account")}
          variant="outline"
          className="w-full justify-start gap-3 h-14 rounded-2xl border-gray-200 text-gray-700 font-semibold"
        >
          <UserCog className="w-5 h-5 text-blue-600" /> Account Settings
        </Button>
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full justify-start gap-3 h-14 rounded-2xl shadow-lg shadow-red-100 font-semibold"
        >
          <LogOut className="w-5 h-5" /> Logout
        </Button>
      </div>
    </div>
  );
}

/* ================= 3. MAIN HEADER COMPONENT ================= */

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* LOGO */}
        <Link to="/shop/home" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-blue-200">
            <HousePlug className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tight text-gray-900">
            Ecommerce
          </span>
        </Link>

        {/* MOBILE TRIGGER */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[300px] flex flex-col p-6 border-r-0 shadow-2xl"
          >
            <div className="mb-10 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <HousePlug className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tighter">MENU</span>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <MenuItems />
            </div>

            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
