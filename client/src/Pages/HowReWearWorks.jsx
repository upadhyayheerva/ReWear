import {
  Search,
  ShoppingBag,
  Shirt,
  RefreshCcw,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import Header from "../assets/components/Home/Header";
import Footer from "../assets/components/Home/Footer";

export default function HowReWearWorks() {
  return (
    <>
      <Header />

      <main className="bg-gray-50 min-h-screen">

        {/* Hero */}

        <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white">

          <div className="max-w-6xl mx-auto px-5 py-16 md:py-20 text-center">

            <p className="uppercase tracking-widest text-purple-200 font-semibold text-sm">
              Simple • Sustainable • Community
            </p>

            <h1 className="text-4xl md:text-6xl font-bold mt-3">
              How ReWear Works
            </h1>

            <p className="max-w-2xl mx-auto text-purple-100 text-base md:text-lg mt-5 leading-relaxed">
              ReWear makes it easy to give pre-loved clothes a second life.
              Browse, buy, sell, or swap clothing with other members.
            </p>

          </div>

        </section>

        {/* Steps */}

        <section className="max-w-6xl mx-auto px-5 py-14 md:py-20">

          <div className="text-center mb-12">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Get Started in 4 Easy Steps
            </h2>

            <p className="text-gray-500 mt-3">
              Everything you need to use the ReWear marketplace.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Step 1 */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 text-center hover:shadow-lg transition">

              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center">
                <Search
                  size={32}
                  className="text-purple-600"
                />
              </div>

              <div className="text-sm text-purple-600 font-bold mt-6">
                STEP 01
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-2">
                Browse Clothes
              </h3>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                Explore pre-loved clothing and use search or category filters
                to find something you like.
              </p>

            </div>

            {/* Step 2 */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 text-center hover:shadow-lg transition">

              <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center">
                <ShoppingBag
                  size={32}
                  className="text-green-600"
                />
              </div>

              <div className="text-sm text-green-600 font-bold mt-6">
                STEP 02
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-2">
                Buy or Swap
              </h3>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                Choose a clothing item available for sale or send a swap
                request when an item is listed for exchange.
              </p>

            </div>

            {/* Step 3 */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 text-center hover:shadow-lg transition">

              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center">
                <Shirt
                  size={32}
                  className="text-orange-600"
                />
              </div>

              <div className="text-sm text-orange-600 font-bold mt-6">
                STEP 03
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-2">
                Sell Your Clothes
              </h3>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                List clothes you no longer need by adding their details,
                condition, price, image, and listing type.
              </p>

            </div>

            {/* Step 4 */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 text-center hover:shadow-lg transition">

              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center">
                <CheckCircle
                  size={32}
                  className="text-blue-600"
                />
              </div>

              <div className="text-sm text-blue-600 font-bold mt-6">
                STEP 04
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-2">
                Complete the Exchange
              </h3>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                Track your order or swap request and complete the exchange
                with the other member.
              </p>

            </div>

          </div>

        </section>

        {/* Buy Section */}

        <section className="bg-white border-y border-gray-200">

          <div className="max-w-6xl mx-auto px-5 py-14 md:py-16">

            <div className="grid md:grid-cols-2 gap-10 items-center">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <ShoppingBag
                      size={25}
                      className="text-green-600"
                    />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Buying on ReWear
                  </h2>

                </div>

                <p className="text-gray-500 mt-5 leading-relaxed">
                  Find clothing you like, open the product details, and
                  purchase it using the available order option.
                </p>

                <div className="space-y-3 mt-6">

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-600"
                    />
                    <span className="text-gray-700">
                      Search and filter clothing
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-600"
                    />
                    <span className="text-gray-700">
                      View product details
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-600"
                    />
                    <span className="text-gray-700">
                      Place an order
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-600"
                    />
                    <span className="text-gray-700">
                      Track order status
                    </span>
                  </div>

                </div>

                <Link
                  to="/all-products"
                  className="inline-flex items-center gap-2 mt-7 bg-purple-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  Explore Marketplace
                  <ArrowRight size={18} />
                </Link>

              </div>

              <div className="bg-green-50 rounded-3xl p-8 md:p-12">

                <ShoppingBag
                  size={80}
                  className="text-green-600 mx-auto"
                  strokeWidth={1.5}
                />

                <h3 className="text-2xl font-bold text-center text-gray-800 mt-6">
                  Discover Pre-Loved Fashion
                </h3>

                <p className="text-gray-500 text-center mt-3">
                  Find clothing that fits your style while giving existing
                  clothes another life.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Swap Section */}

        <section className="bg-gray-50">

          <div className="max-w-6xl mx-auto px-5 py-14 md:py-16">

            <div className="grid md:grid-cols-2 gap-10 items-center">

              <div className="order-2 md:order-1 bg-purple-50 rounded-3xl p-8 md:p-12">

                <RefreshCcw
                  size={80}
                  className="text-purple-600 mx-auto"
                  strokeWidth={1.5}
                />

                <h3 className="text-2xl font-bold text-center text-gray-800 mt-6">
                  Give Your Clothes a New Home
                </h3>

                <p className="text-gray-500 text-center mt-3">
                  Offer another clothing item and send a swap request to
                  another member.
                </p>

              </div>

              <div className="order-1 md:order-2">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <RefreshCcw
                      size={25}
                      className="text-purple-600"
                    />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Swapping on ReWear
                  </h2>

                </div>

                <p className="text-gray-500 mt-5 leading-relaxed">
                  Some listings are available specifically for clothing
                  exchange. You can send a swap request with details about
                  the clothing you want to offer.
                </p>

                <div className="space-y-3 mt-6">

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      className="text-purple-600"
                    />
                    <span className="text-gray-700">
                      Find a clothing item marked for swap
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      className="text-purple-600"
                    />
                    <span className="text-gray-700">
                      Enter the clothing you want to offer
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      className="text-purple-600"
                    />
                    <span className="text-gray-700">
                      Send a swap request
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      className="text-purple-600"
                    />
                    <span className="text-gray-700">
                      Follow the request status
                    </span>
                  </div>

                </div>

                <Link
                  to="/all-products"
                  className="inline-flex items-center gap-2 mt-7 bg-purple-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  Find Swap Items
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* Selling Section */}

        <section className="bg-white border-y border-gray-200">

          <div className="max-w-6xl mx-auto px-5 py-14 md:py-16 text-center">

            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center">
              <Shirt
                size={34}
                className="text-orange-600"
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-5">
              Have Clothes You Don't Wear?
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto mt-4">
              List your pre-loved clothes on ReWear and let someone else
              discover them. Add the clothing details, image, price,
              condition, and choose whether you want to sell or swap.
            </p>

            <Link
              to="/product-listing"
              className="inline-flex items-center gap-2 mt-7 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition"
            >
              List Your Clothes
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

        {/* Final CTA */}

        <section className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white">

          <div className="max-w-4xl mx-auto px-5 py-14 text-center">

            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Give Clothes a Second Life?
            </h2>

            <p className="text-purple-100 mt-4">
              Explore the ReWear marketplace and discover your next
              pre-loved favourite.
            </p>

            <Link
              to="/all-products"
              className="inline-flex items-center gap-2 mt-7 bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Start Exploring
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}