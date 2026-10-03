import { useState } from "react";
import { ArrowLeft, RefreshCcw, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../assets/components/Home/Header";
import Footer from "../assets/components/Home/Footer";
import { API_BASE_URL } from '../utils';

export default function MySwapRequests() {
  const [email, setEmail] = useState(
    localStorage.getItem("buyerEmail") || ""
  );

  const [requests, setRequests] = useState([]);
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
        `${API_BASE_URL}/api/swap-requests/requester/${encodeURIComponent(
          email.trim()
        )}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Could not fetch swap requests."
        );
      }

      setRequests(result.requests || []);

      localStorage.setItem("buyerEmail", email.trim());
    } catch (error) {
      console.error("Error fetching swap requests:", error);

      setRequests([]);

      alert("Unable to fetch swap requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === "ACCEPTED") {
      return "bg-green-100 text-green-700";
    }

    if (status === "REJECTED") {
      return "bg-red-100 text-red-700";
    }

    if (status === "COMPLETED") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "CANCELLED") {
      return "bg-gray-100 text-gray-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <>
      <Header showSearchBar={false} />

      <main className="min-h-screen bg-gray-50 px-4 py-10">

        <div className="max-w-5xl mx-auto">

          {/* BACK */}

          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline mb-6"
          >
            <ArrowLeft size={18} />
            Back to Marketplace
          </Link>

          {/* TITLE */}

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <RefreshCcw
                size={26}
                className="text-purple-600"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                My Swap Requests
              </h1>

              <p className="text-gray-500 mt-1">
                Track the clothing swaps you have requested.
              </p>
            </div>

          </div>

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mt-8 mb-8"
          >

            <label className="block font-semibold text-gray-700 mb-2">
              Enter your swap request email
            </label>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the email used for the request"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50"
              >
                <Search size={18} />

                {loading
                  ? "Searching..."
                  : "Find Requests"}
              </button>

            </div>

          </form>

          {/* LOADING */}

          {loading && (
            <div className="text-center py-16 text-gray-500">
              Loading your swap requests...
            </div>
          )}

          {/* NO REQUESTS */}

          {!loading &&
            searched &&
            requests.length === 0 && (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">

                <RefreshCcw
                  size={48}
                  className="mx-auto text-gray-400"
                />

                <h2 className="text-xl font-bold text-gray-700 mt-4">
                  No swap requests found
                </h2>

                <p className="text-gray-500 mt-2">
                  You have not sent any swap requests with this email.
                </p>

                <Link
                  to="/all-products"
                  className="inline-block mt-5 bg-purple-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-purple-700"
                >
                  Find Clothes to Swap
                </Link>

              </div>
            )}

          {/* REQUEST LIST */}

          {!loading && requests.length > 0 && (
            <div className="space-y-5">

              {requests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6"
                >

                  <div className="flex flex-col sm:flex-row gap-5">

                    {/* IMAGE */}

                    <img
                      src={request.productImage}
                      alt={request.productTitle}
                      className="w-full sm:w-36 h-40 object-contain bg-gray-50 rounded-xl border border-gray-100"
                    />

                    {/* DETAILS */}

                    <div className="flex-1">

                      <div className="flex flex-wrap justify-between gap-3">

                        <h2 className="text-xl font-bold text-gray-800">
                          {request.productTitle}
                        </h2>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold h-fit ${getStatusClass(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>

                      </div>

                      <p className="text-gray-600 mt-3">
                        <strong>You offered:</strong>{" "}
                        {request.offeredClothing}
                      </p>

                      {request.message && (
                        <p className="text-gray-500 text-sm mt-2">
                          <strong>Your message:</strong>{" "}
                          {request.message}
                        </p>
                      )}

                      <p className="text-gray-500 text-sm mt-3">
                        Seller:{" "}
                        {request.sellerName || "Seller"}
                      </p>

                      <p className="text-gray-500 text-sm mt-1">
                        Request ID: {request._id}
                      </p>

                      <p className="text-gray-500 text-sm mt-1">
                        Requested on:{" "}
                        {new Date(
                          request.createdAt
                        ).toLocaleDateString()}
                      </p>

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