import {
  Shirt,
  RefreshCcw,
  ShieldCheck,
  Tag
} from "lucide-react";

export default function SiteHighlights() {
  return (
    <div className="raleway hidden md:flex justify-center items-center px-4 py-6">
      <div className="flex flex-col md:flex-row border border-gray-300 rounded-md w-full md:w-18/20 justify-center bg-white">

        {/* Pre-Loved Fashion */}
        <div className="flex w-full md:w-1/4 md:p-4 items-center md:justify-center">
          <div className="m-3">
            <Shirt size={35} className="text-purple-600" />
          </div>

          <div className="m-3">
            <p className="text-black font-semibold">
              PRE-LOVED FASHION
            </p>
            <p className="text-sm text-gray-500">
              Quality clothes, second life
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center mx-2">
          <div className="border-l h-12 border-gray-300" />
        </div>

        {/* Easy Swaps */}
        <div className="flex w-full md:w-1/4 md:p-4 items-center md:justify-center">
          <div className="m-3">
            <RefreshCcw size={35} className="text-purple-600" />
          </div>

          <div className="m-3">
            <p className="text-black font-semibold">
              EASY SWAPS
            </p>
            <p className="text-sm text-gray-500">
              Exchange clothes with others
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center mx-2">
          <div className="border-l h-12 border-gray-300" />
        </div>

        {/* Safe Marketplace */}
        <div className="flex w-full md:w-1/4 md:p-4 items-center md:justify-center">
          <div className="m-3">
            <ShieldCheck size={35} className="text-purple-600" />
          </div>

          <div className="m-3">
            <p className="text-black font-semibold">
              SAFE MARKETPLACE
            </p>
            <p className="text-sm text-gray-500">
              Simple & secure experience
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center mx-2">
          <div className="border-l h-12 border-gray-300" />
        </div>

        {/* Better Prices */}
        <div className="flex w-full md:w-1/4 md:p-4 items-center md:justify-center">
          <div className="m-3">
            <Tag size={35} className="text-purple-600" />
          </div>

          <div className="m-3">
            <p className="text-black font-semibold">
              BETTER PRICES
            </p>
            <p className="text-sm text-gray-500">
              Fashion at affordable prices
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}