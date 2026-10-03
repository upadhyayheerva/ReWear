import { ArrowRight, RefreshCcw, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSlider() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div className="text-white">
            <p className="uppercase tracking-widest text-purple-200 font-semibold text-sm mb-3">
              Sustainable Fashion Marketplace
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Give Clothes
              <span className="block text-yellow-300">
                A Second Life.
              </span>
            </h1>

            <p className="mt-5 text-purple-100 text-base md:text-lg max-w-xl">
              Buy pre-loved fashion, sell clothes you no longer need,
              or swap your wardrobe with others.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/all-products"
                className="flex items-center gap-2 bg-white text-purple-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
              >
                <ShoppingBag size={20} />
                Explore Clothes
              </Link>

              <Link
                to="/product-listing"
                className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-purple-700 transition"
              >
                Sell Your Clothes
                <ArrowRight size={20} />
              </Link>

            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">

              <div className="absolute inset-0 bg-white/10 rounded-full"></div>

              <div className="absolute inset-8 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center text-purple-700">
                <RefreshCcw size={70} strokeWidth={1.5} />

                <h2 className="text-2xl font-bold mt-5">
                  ReWear
                </h2>

                <p className="text-gray-500 text-center px-6 mt-2">
                  Wear. Swap. Repeat.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}