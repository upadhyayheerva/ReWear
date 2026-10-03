import { useState } from "react";
import { Search, Package, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../assets/components/Home/Header";
import Footer from "../assets/components/Home/Footer";

export default function MyOrders() {
  const [email, setEmail] = useState(
    localStorage.getItem("buyerEmail") || ""
  );
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);

      const response = await fetch(
        `http://localhost:3000/api/orders/buyer/${encodeURIComponent(email.trim())}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not fetch orders.");
      }

      setOrders(result.orders || []);
      localStorage.setItem("buyerEmail", email.trim());
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      alert("Unable to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header showSearchBar={false} />

      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-5xl mx-auto">

          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline mb-6"
          >
            <ArrowLeft size={18} />
            Back to Marketplace
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            View and track the clothing orders you have placed.
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mb-8"
          >
            <label className="block font-semibold text-gray-700 mb-2">
              Enter your order email
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the email used when ordering"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50"
              >
                <Search size={18} />
                {loading ? "Searching..." : "Find Orders"}
              </button>
            </div>
          </form>

          {loading ? (
            <div className="text-center py-16 text-gray-500">
              Loading your orders...
            </div>
          ) : searched && orders.length === 0 ? (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
              <Package size={48} className="mx-auto text-gray-400" />
              <h2 className="text-xl font-bold text-gray-700 mt-4">
                No orders found
              </h2>
              <p className="text-gray-500 mt-2">
                Check your email address or explore the marketplace.
              </p>
              <Link
                to="/all-products"
                className="inline-block mt-5 bg-purple-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-purple-700"
              >
                Explore Clothes
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <img
                      src={order.productImage}
                      alt={order.productTitle}
                      className="w-full sm:w-36 h-40 object-contain bg-gray-50 rounded-xl border border-gray-100"
                    />

                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between gap-3">
                        <h2 className="text-xl font-bold text-gray-800">
                          {order.productTitle}
                        </h2>

                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold h-fit">
                          {order.status}
                        </span>
                      </div>

                      <p className="text-green-600 text-xl font-bold mt-3">
                        ₹ {order.price}
                      </p>

                      <p className="text-gray-500 text-sm mt-3">
                        Seller: {order.sellerName || "Seller"}
                      </p>

                      <p className="text-gray-500 text-sm mt-1">
                        Order ID: {order._id}
                      </p>

                      <p className="text-gray-500 text-sm mt-1">
                        Ordered on:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      {order.buyerLocation && (
                        <p className="text-gray-500 text-sm mt-1">
                          Delivery location: {order.buyerLocation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}