import { Navigate, useLocation } from "react-router-dom";

/**
 * CheckAuth Component
 * Responsibility: Managing route access based on authentication status and user roles.
 */
function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // Path Helper Constants
  const isAuthPage = path.includes("/login") || path.includes("/register");
  const isAdminRoute = path.includes("/admin");
  const isShopRoute = path.includes("/shop");

  // 1. Root Path Redirects
  if (path === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // 2. Protect Private Routes: Redirect unauthenticated users to login
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/auth/login" />;
  }

  // 3. Prevent Auth Page Access: Redirect authenticated users away from Login/Register
  if (isAuthenticated && isAuthPage) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // 4. Role-Based Protection: Prevent non-admins from accessing admin routes
  if (isAuthenticated && user?.role !== "admin" && isAdminRoute) {
    return <Navigate to="/unauth-page" />;
  }

  // 5. Role-Based Protection: Redirect admins away from regular shop routes to their dashboard
  if (isAuthenticated && user?.role === "admin" && isShopRoute) {
    return <Navigate to="/admin/dashboard" />;
  }

  // If none of the above conditions are met, allow access to the requested page
  return <>{children}</>;
}

export default CheckAuth;
