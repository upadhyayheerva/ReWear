import { ShoppingBag, RefreshCcw, User, Menu, X } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import MobileMenu from "./MobileMenu.jsx";
import "../../Styles/Header.css";
import { Link } from "react-router-dom";

export default function HeaderMain({ showSearchBar = true }) {
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [isAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const userName = localStorage.getItem("loggedInUser");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchText);
  };

  return (
    <div className="bg-[#7c3aed] px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/">
          <h3 className="raleway Header-logo text-4xl text-white font-bold">
            ReWear
          </h3>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center w-1/2">
          {showSearchBar && (
            <SearchBar
              searchText={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
            />
          )}
        </div>

        {/* Login / User */}
        {!isAuthenticated ? (
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-[#7c3aed] font-bold rounded-xl shadow hover:bg-gray-100 transition"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className="px-3 py-2 text-white font-bold hover:text-gray-200 hover:underline transition"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full">
            <Link to="/profile" className="flex items-center gap-2">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userName || "User"
                )}&background=7c3aed&color=fff&rounded=true&size=40`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border border-white"
              />

              <span className="text-white font-semibold">
                {userName || "User"}
              </span>
            </Link>
          </div>
        )}

        {/* Icons */}
        <div className="hidden md:flex items-center gap-5">

          {/* Marketplace */}
          <Link
            to="/all-products"
            className="text-white hover:text-gray-200"
            title="Marketplace"
          >
            <ShoppingBag size={28} />
          </Link>

          {/* My Swap Requests */}
          <Link
            to="/my-swap-requests"
            className="text-white hover:text-gray-200"
            title="My Swap Requests"
          >
            <RefreshCcw size={28} />
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="text-white hover:text-gray-200"
            title="Profile"
          >
            <User size={28} />
          </Link>

        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && <MobileMenu />}
    </div>
  );
}