import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  UserRound,
  MapPin,
  Shirt,
  CheckCircle,
} from "lucide-react";

import Header from "../assets/components/Home/Header";
import Footer from "../assets/components/Home/Footer";

export default function ContactSeller() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const [buyerName, setBuyerName] = useState(
    localStorage.getItem("loggedInUser") || ""
  );

  const [buyerEmail, setBuyerEmail] = useState(
    localStorage.getItem("buyerEmail") || ""
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/rewear-products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!buyerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!buyerEmail.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    /*
      This is currently a frontend contact workflow.
      The message is shown as successfully sent.
      A real chat/message API can be added later if required.
    */

    setSent(true);
    setMessage("");
  };

  if (loading) {
    return (
      <>
        <Header showSearchBar={false} />

        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
          <div className="text-center">

            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />

            <p className="text-gray-500 mt-4">
              Loading seller information...
            </p>

          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />

        <main className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-5">

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center max-w-lg w-full">

            <Shirt
              size={55}
              className="mx-auto text-gray-400"
            />

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              Clothing Item Not Found
            </h2>

            <p className="text-gray-500 mt-3">
              The clothing item you're trying to contact the seller about
              could not be found.
            </p>

            <Link
              to="/all-products"
              className="inline-flex items-center gap-2 mt-6 bg-purple-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              <ArrowLeft size={18} />
              Back to Marketplace
            </Link>

          </div>

        </main>

        <Footer />
      </>
    );
  }

  const seller = product.seller || {};

  return (
    <>
      <Header showSearchBar={false} />

      <main className="min-h-screen bg-gray-50 px-4 py-10">

        <div className="max-w-5xl mx-auto">

          {/* Back */}

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-purple-600 font-semibold hover:underline mb-6"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* Success Message */}

          {sent && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-5">

              <div className="flex items-start gap-3">

                <CheckCircle
                  size={25}
                  className="text-green-600 mt-0.5"
                />

                <div>

                  <h3 className="font-bold text-green-800">
                    Message Sent Successfully
                  </h3>

                  <p className="text-green-700 text-sm mt-1">
                    Your message has been sent regarding this clothing
                    item.
                  </p>

                </div>

              </div>

            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">

            {/* Product */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Clothing Item
              </h2>

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-72 object-contain bg-gray-50 rounded-xl"
              />

              <h3 className="text-2xl font-bold text-gray-800 mt-5">
                {product.title}
              </h3>

              <p className="text-green-600 text-xl font-bold mt-2">
                ₹ {product.price}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    Category
                  </p>
                  <p className="font-semibold text-gray-800">
                    {product.category || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    Size
                  </p>
                  <p className="font-semibold text-gray-800">
                    {product.size || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    Condition
                  </p>
                  <p className="font-semibold text-gray-800">
                    {product.condition || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    Listing
                  </p>
                  <p className="font-semibold text-purple-600">
                    {product.listingType === "SWAP"
                      ? "Swap"
                      : "For Sale"}
                  </p>
                </div>

              </div>

            </div>

            {/* Contact Seller */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <UserRound
                    size={25}
                    className="text-purple-600"
                  />
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    Contact Seller
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Ask the seller about this clothing item.
                  </p>

                </div>

              </div>

              {/* Seller Information */}

              <div className="bg-purple-50 rounded-xl p-4 mb-6">

                <p className="text-sm text-gray-500">
                  Seller
                </p>

                <p className="text-lg font-bold text-gray-800 mt-1">
                  {seller.name || "Seller"}
                </p>

                {seller.location && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                    <MapPin size={16} />
                    {seller.location}
                  </div>
                )}

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>

                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) =>
                      setBuyerName(e.target.value)
                    }
                    placeholder="Enter your name"
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />

                </div>

                {/* Email */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email
                  </label>

                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) =>
                      setBuyerEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />

                </div>

                {/* Message */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>

                  <textarea
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    rows="6"
                    placeholder="Hi, I am interested in this clothing item..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />

                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition"
                >
                  <Send size={19} />
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}