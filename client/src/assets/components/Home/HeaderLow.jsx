import { MapPin, RefreshCcw, ShoppingBag, Info } from "lucide-react";
import SearchBar from "./SearchBar";
import React from "react";
import { Link } from "react-router-dom";

export default function HeaderLow({ showSearchBar = true }) {
  return (
    <>
      <div className="raleway w-full bg-white border-b border-gray-200 text-sm lg:text-md">

        <div className="hidden md:flex justify-between items-center px-4 py-3">

          <div className="flex gap-6 items-center">

            <Link
              to="/all-products"
              className="flex items-center gap-1 hover:text-purple-600"
            >
              <ShoppingBag size={18} />
              Marketplace
            </Link>

            <Link
              to="/product-listing"
              className="flex items-center gap-1 hover:text-purple-600"
            >
              Sell Clothes
            </Link>

            <Link
              to="/all-products"
              className="flex items-center gap-1 hover:text-purple-600"
            >
              Buy Clothes
            </Link>

            <Link
              to="/my-swap-requests"
              className="flex items-center gap-1 hover:text-purple-600"
            >
              <RefreshCcw size={18} />
              Swap
            </Link>

            <Link
              to="/my-orders"
              className="flex items-center gap-1 hover:text-purple-600"
            >
              <MapPin size={18} />
              Track Order
            </Link>

            <Link
              to="/how-rewear-works"
              className="flex items-center gap-1 hover:text-purple-600"
            >
              <Info size={18} />
              How ReWear Works
            </Link>

          </div>

        </div>

      </div>

      {/* Mobile Search */}
      <div className="flex md:hidden w-full px-5 py-2">
        {showSearchBar && <SearchBar showSearchBar={true} />}
      </div>
    </>
  );
}