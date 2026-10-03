import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { API_BASE_URL } from '../../../utils';
import {
  Loader,
  ArrowLeft,
  MapPin,
  Tag,
  Shirt,
  RefreshCcw,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showSwapForm, setShowSwapForm] = useState(false);

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingSwap, setLoadingSwap] = useState(false);

  const [buyerInfo, setBuyerInfo] = useState({
    buyerName: localStorage.getItem("loggedInUser") || "",
    buyerEmail: localStorage.getItem("buyerEmail") || "",
    buyerLocation: "",
  });

  const [swapInfo, setSwapInfo] = useState({
    requesterName: localStorage.getItem("loggedInUser") || "",
    requesterEmail: localStorage.getItem("buyerEmail") || "",
    requesterLocation: "",
    offeredClothing: "",
    message: "",
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/rewear-products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }

        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setProduct(null);
      });
  }, [id]);

  const handleBuyerChange = (e) => {
    const { name, value } = e.target;

    setBuyerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwapChange = (e) => {
    const { name, value } = e.target;

    setSwapInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const { buyerName, buyerEmail, buyerLocation } = buyerInfo;

    if (!buyerName || !buyerEmail || !buyerLocation) {
      alert("Please fill all buyer details.");
      return;
    }

    try {
      setLoadingOrder(true);

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          buyerName,
          buyerEmail,
          buyerLocation,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to place order.");
        return;
      }

      localStorage.setItem("buyerEmail", buyerEmail);

      console.log("Order created:", result);

      setOrderSuccess(true);
      setShowOrderForm(false);
    } catch (error) {
      console.error("Order error:", error);
      alert("Unable to place order. Please try again.");
    } finally {
      setLoadingOrder(false);
    }
  };

  const handleSwapRequest = async (e) => {
    e.preventDefault();

    const {
      requesterName,
      requesterEmail,
      requesterLocation,
      offeredClothing,
      message,
    } = swapInfo;

    if (
      !requesterName ||
      !requesterEmail ||
      !requesterLocation ||
      !offeredClothing
    ) {
      alert("Please fill all required swap details.");
      return;
    }

    try {
      setLoadingSwap(true);

      const response = await fetch(
        `${API_BASE_URL}/api/swap-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
            requesterName,
            requesterEmail,
            requesterLocation,
            offeredClothing,
            message,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to send swap request.");
        return;
      }

      localStorage.setItem("buyerEmail", requesterEmail);

      console.log("Swap request created:", result);

      setSwapSuccess(true);
      setShowSwapForm(false);
    } catch (error) {
      console.error("Swap request error:", error);
      alert("Unable to send swap request. Please try again.");
    } finally {
      setLoadingSwap(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader size={50} className="animate-spin text-purple-600" />

        <p className="text-gray-500 mt-4">
          Loading product...
        </p>
      </div>
    );
  }

  return (
    <>
      <Header showSearchBar={false} />

      <div className="px-4 py-2 md:hidden">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-600 font-semibold hover:underline"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </button>
      </div>

      <div className="bg-gray-200 w-full h-[1px]" />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* ORDER SUCCESS */}

        {orderSuccess && (
          <div className="max-w-2xl mx-auto mb-8 bg-green-50 border border-green-200 rounded-2xl p-8 text-center">

            <CheckCircle
              size={60}
              className="text-green-600 mx-auto"
            />

            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mt-4">
              Order Placed Successfully!
            </h2>

            <p className="text-gray-600 mt-3">
              Your order for <strong>{product.title}</strong> has been
              placed successfully.
            </p>

            <p className="text-gray-500 mt-2">
              Order Status: <strong>PLACED</strong>
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">

              <Link
                to="/all-products"
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700"
              >
                Continue Shopping
              </Link>

              <Link
                to="/my-orders"
                className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50"
              >
                My Orders
              </Link>

            </div>
          </div>
        )}

        {/* SWAP SUCCESS */}

        {swapSuccess && (
          <div className="max-w-2xl mx-auto mb-8 bg-green-50 border border-green-200 rounded-2xl p-8 text-center">

            <CheckCircle
              size={60}
              className="text-green-600 mx-auto"
            />

            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mt-4">
              Swap Request Sent!
            </h2>

            <p className="text-gray-600 mt-3">
              Your swap request for{" "}
              <strong>{product.title}</strong> has been sent to the seller.
            </p>

            <p className="text-gray-500 mt-2">
              Request Status: <strong>PENDING</strong>
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">

              <Link
                to="/all-products"
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700"
              >
                Browse Marketplace
              </Link>

              <Link
                to="/my-swap-requests"
                className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50"
              >
                My Swap Requests
              </Link>

            </div>
          </div>
        )}

        {!orderSuccess && !swapSuccess && (
          <div className="grid md:grid-cols-2 gap-10">

            {/* PRODUCT IMAGE */}

            <div className="bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center min-h-[400px]">

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[400px] md:h-[550px] object-contain rounded-2xl p-6"
              />

            </div>

            {/* PRODUCT INFORMATION */}

            <div className="py-2">

              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {product.listingType === "SWAP"
                  ? "Available for Swap"
                  : "For Sale"}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {product.title}
              </h1>

              <p className="text-3xl font-bold text-green-600 mt-5">
                ₹ {product.price}
              </p>

              <p className="text-gray-600 mt-5 leading-relaxed">
                {product.description}
              </p>

              {/* PRODUCT INFORMATION */}

              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="border rounded-xl p-4">
                  <div className="flex items-center gap-2 text-purple-600">
                    <Tag size={20} />
                    <span className="font-semibold">
                      Category
                    </span>
                  </div>

                  <p className="text-gray-700 mt-2">
                    {product.category}
                  </p>
                </div>

                <div className="border rounded-xl p-4">
                  <div className="flex items-center gap-2 text-purple-600">
                    <Shirt size={20} />
                    <span className="font-semibold">
                      Size
                    </span>
                  </div>

                  <p className="text-gray-700 mt-2">
                    {product.size}
                  </p>
                </div>

                <div className="border rounded-xl p-4">
                  <span className="text-purple-600 font-semibold">
                    Condition
                  </span>

                  <p className="text-gray-700 mt-2">
                    {product.condition}
                  </p>
                </div>

                <div className="border rounded-xl p-4">
                  <span className="text-purple-600 font-semibold">
                    Brand
                  </span>

                  <p className="text-gray-700 mt-2">
                    {product.brand || "Not specified"}
                  </p>
                </div>

              </div>

              {/* SELLER */}

              <div className="border-t border-gray-200 mt-8 pt-6">

                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Seller Information
                </h2>

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg">
                    {product.seller?.name?.charAt(0)?.toUpperCase() ||
                      "S"}
                  </div>

                  <div>

                    <p className="font-semibold text-gray-800">
                      {product.seller?.name || "Seller"}
                    </p>

                    {product.seller?.location && (
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <MapPin size={15} />
                        {product.seller.location}
                      </p>
                    )}

                  </div>

                </div>

              </div>

              {/* ORDER FORM */}

              {showOrderForm && product.listingType !== "SWAP" && (
                <div className="mt-8 border border-purple-200 bg-purple-50 rounded-2xl p-6">

                  <h2 className="text-2xl font-bold text-gray-800">
                    Complete Your Order
                  </h2>

                  <p className="text-gray-500 mt-1 mb-6">
                    Enter your details to place this order.
                  </p>

                  <form
                    onSubmit={handlePlaceOrder}
                    className="space-y-5"
                  >

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="buyerName"
                        value={buyerInfo.buyerName}
                        onChange={handleBuyerChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="buyerEmail"
                        value={buyerInfo.buyerEmail}
                        onChange={handleBuyerChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Delivery Location
                      </label>

                      <input
                        type="text"
                        name="buyerLocation"
                        value={buyerInfo.buyerLocation}
                        onChange={handleBuyerChange}
                        placeholder="Enter your delivery location"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-200">

                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Product
                        </span>

                        <span className="font-semibold">
                          {product.title}
                        </span>
                      </div>

                      <div className="flex justify-between mt-2">
                        <span className="text-gray-600">
                          Total Amount
                        </span>

                        <span className="text-green-600 font-bold text-lg">
                          ₹ {product.price}
                        </span>
                      </div>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">

                      <button
                        type="submit"
                        disabled={loadingOrder}
                        className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50"
                      >
                        {loadingOrder
                          ? "Placing Order..."
                          : "Place Order"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowOrderForm(false)}
                        className="flex-1 border-2 border-gray-300 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50"
                      >
                        Cancel
                      </button>

                    </div>

                  </form>
                </div>
              )}

              {/* SWAP FORM */}

              {showSwapForm && product.listingType === "SWAP" && (
                <div className="mt-8 border border-purple-200 bg-purple-50 rounded-2xl p-6">

                  <h2 className="text-2xl font-bold text-gray-800">
                    Request a Swap
                  </h2>

                  <p className="text-gray-500 mt-1 mb-6">
                    Tell the seller what you would like to offer.
                  </p>

                  <form
                    onSubmit={handleSwapRequest}
                    className="space-y-5"
                  >

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name
                      </label>

                      <input
                        type="text"
                        name="requesterName"
                        value={swapInfo.requesterName}
                        onChange={handleSwapChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="requesterEmail"
                        value={swapInfo.requesterEmail}
                        onChange={handleSwapChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Location
                      </label>

                      <input
                        type="text"
                        name="requesterLocation"
                        value={swapInfo.requesterLocation}
                        onChange={handleSwapChange}
                        placeholder="Enter your location"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        What are you offering?
                      </label>

                      <input
                        type="text"
                        name="offeredClothing"
                        value={swapInfo.offeredClothing}
                        onChange={handleSwapChange}
                        placeholder="Example: Blue Denim Jacket"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>

                      <textarea
                        name="message"
                        value={swapInfo.message}
                        onChange={handleSwapChange}
                        placeholder="Write a message to the seller..."
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      />
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-200">

                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Clothing
                        </span>

                        <span className="font-semibold">
                          {product.title}
                        </span>
                      </div>

                      <div className="flex justify-between mt-2">
                        <span className="text-gray-600">
                          Seller
                        </span>

                        <span className="font-semibold">
                          {product.seller?.name || "Seller"}
                        </span>
                      </div>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">

                      <button
                        type="submit"
                        disabled={loadingSwap}
                        className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50"
                      >
                        {loadingSwap
                          ? "Sending Request..."
                          : "Send Swap Request"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowSwapForm(false)}
                        className="flex-1 border-2 border-gray-300 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50"
                      >
                        Cancel
                      </button>

                    </div>

                  </form>
                </div>
              )}

              {/* ACTIONS */}

              {!showOrderForm && !showSwapForm && (
                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                  {product.listingType === "SWAP" ? (
                    <button
                      onClick={() => setShowSwapForm(true)}
                      className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition"
                    >
                      <RefreshCcw size={20} />
                      Request Swap
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowOrderForm(true)}
                      className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition"
                    >
                      <ShoppingBag size={20} />
                      Buy Now
                    </button>
                  )}

                  <Link
                    to={`/contact-seller/${product._id}`}
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition"
                  >
                    {product.listingType === "SWAP"
                      ? "Contact Seller"
                      : "Add to Cart"}
                  </Link>

                </div>
              )}

            </div>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}