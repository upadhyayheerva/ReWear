import { ArrowRight, Recycle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 raleway text-white">

      <div className="flex flex-col md:flex-row md:justify-center md:gap-20 px-6 py-12 gap-10">

        {/* ReWear */}
        <div className="w-full md:w-64">
          <Link to="/">
            <div className="flex items-center gap-2">
              <Recycle size={32} className="text-purple-400" />
              <h3 className="text-4xl font-bold">
                ReWear
              </h3>
            </div>
          </Link>

          <p className="text-gray-400 mt-5 leading-relaxed">
            A clothing exchange marketplace where you can buy,
            sell and swap pre-loved fashion.
          </p>

          <p className="text-gray-500 text-sm mt-5">
            Wear. Swap. Repeat. ♻️
          </p>
        </div>

        {/* Categories */}
        <div className="w-full md:w-auto">
          <h2 className="text-xl font-semibold">
            CLOTHING CATEGORIES
          </h2>

          <ul className="text-gray-400 my-5 space-y-2">
            <li>
              <Link to="/all-products" className="hover:text-white">
                Men
              </Link>
            </li>

            <li>
              <Link to="/all-products" className="hover:text-white">
                Women
              </Link>
            </li>

            <li>
              <Link to="/all-products" className="hover:text-white">
                Dresses
              </Link>
            </li>

            <li>
              <Link to="/all-products" className="hover:text-white">
                Jackets
              </Link>
            </li>

            <li>
              <Link to="/all-products" className="hover:text-white">
                Shoes
              </Link>
            </li>

            <li>
              <Link to="/all-products" className="hover:text-white">
                Accessories
              </Link>
            </li>

            <li>
              <Link
                to="/all-products"
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 hover:underline"
              >
                Browse all clothes
                <ArrowRight size={16} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-auto">
          <h2 className="text-xl font-semibold">
            QUICK LINKS
          </h2>

          <ul className="text-gray-400 my-5 space-y-2">
            <li>
              <Link to="/all-products" className="hover:text-white">
                Marketplace
              </Link>
            </li>

            <li>
              <Link to="/product-listing" className="hover:text-white">
                Sell Clothes
              </Link>
            </li>

            <li>
              <Link to="/all-products" className="hover:text-white">
                Buy Clothes
              </Link>
            </li>

            <li>
              <Link to="/my-swap-requests" className="hover:text-white">
                Swap Clothes
              </Link>
            </li>

            <li>
              <Link to="/profile" className="hover:text-white">
                My Profile
              </Link>
            </li>

            <li>
              <Link to="/how-rewear-works" className="hover:text-white">
                How ReWear Works
              </Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div className="w-full md:w-64">
          <h2 className="text-xl font-semibold">
            ABOUT REWEAR
          </h2>

          <p className="text-gray-400 my-5 leading-relaxed">
            ReWear helps people extend the life of their clothes
            by making it easy to sell, buy and exchange pre-loved
            fashion.
          </p>

          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-semibold transition"
          >
            Explore Marketplace
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>

      <div className="flex justify-center">
        <div className="border-b border-gray-600 w-full" />
      </div>

      <div className="text-center py-5 text-sm md:text-base">
        <p className="text-gray-400">
          © 2026 ReWear | Clothing Exchange & Swap Marketplace
        </p>
      </div>

    </footer>
  );
}