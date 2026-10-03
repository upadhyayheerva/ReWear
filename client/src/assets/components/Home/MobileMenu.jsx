import {
  ShoppingBag,
  User,
  RefreshCcw,
  Shirt,
  LogIn,
  UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  const isAuthenticated = !!localStorage.getItem("token");
  const userName = localStorage.getItem("loggedInUser") || "Guest";

  return (
    <div className="md:hidden mt-4 pb-4 space-y-4">

      {/* User */}
      {isAuthenticated ? (
        <Link
          to="/profile"
          className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl"
        >
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&background=7c3aed&color=fff&rounded=true&size=40`}
            alt="User Avatar"
            className="w-9 h-9 rounded-full border border-white"
          />

          <span className="text-white font-semibold">
            {userName}
          </span>
        </Link>
      ) : (
        <div className="flex gap-3">
          <Link
            to="/login"
            className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold"
          >
            <LogIn size={18} />
            Login
          </Link>

          <Link
            to="/signup"
            className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded-lg font-semibold"
          >
            <UserPlus size={18} />
            Sign Up
          </Link>
        </div>
      )}

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-2">

        {/* Marketplace */}
        <Link
          to="/all-products"
          className="flex items-center gap-2 text-white bg-white/10 p-3 rounded-lg"
        >
          <ShoppingBag size={20} />
          Marketplace
        </Link>

        {/* Sell Clothes */}
        <Link
          to="/product-listing"
          className="flex items-center gap-2 text-white bg-white/10 p-3 rounded-lg"
        >
          <Shirt size={20} />
          Sell Clothes
        </Link>

        {/* Swap Requests */}
        <Link
          to="/my-swap-requests"
          className="flex items-center gap-2 text-white bg-white/10 p-3 rounded-lg"
        >
          <RefreshCcw size={20} />
          My Swap Requests
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="flex items-center gap-2 text-white bg-white/10 p-3 rounded-lg"
        >
          <User size={20} />
          Profile
        </Link>

      </div>

    </div>
  );
}