import { RefreshCcw, ShieldCheck, Tag, Users } from "lucide-react";

export default function MacbookSale() {
  return (
    <section className="py-12 px-5 md:px-10 bg-gray-50">

      <div className="max-w-6xl mx-auto text-center">

        <p className="text-purple-600 font-semibold uppercase tracking-widest text-sm">
          Why ReWear?
        </p>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2">
          Fashion That Keeps Moving
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mt-4">
          Give your unused clothes a new home while discovering affordable
          fashion from real people in the community.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <Tag
              size={38}
              className="mx-auto text-purple-600"
            />

            <h3 className="font-bold text-lg mt-4">
              Affordable
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Find quality pre-loved clothes at better prices.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <RefreshCcw
              size={38}
              className="mx-auto text-purple-600"
            />

            <h3 className="font-bold text-lg mt-4">
              Easy Swaps
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Exchange clothes and refresh your wardrobe.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <Users
              size={38}
              className="mx-auto text-purple-600"
            />

            <h3 className="font-bold text-lg mt-4">
              Community
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Connect with people who share your fashion interests.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <ShieldCheck
              size={38}
              className="mx-auto text-purple-600"
            />

            <h3 className="font-bold text-lg mt-4">
              Simple & Secure
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              A simple marketplace for buying, selling and swapping.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}