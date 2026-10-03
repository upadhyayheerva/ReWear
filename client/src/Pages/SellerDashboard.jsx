import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  RefreshCcw,
  Clock,
  CheckCircle,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

import Header from "../assets/components/Home/Header";
import Footer from "../assets/components/Home/Footer";

export default function SellerDashboard() {
  const sellerName = localStorage.getItem("loggedInUser") || "";

  const [orders, setOrders] = useState([]);
  const [swapRequests, setSwapRequests] = useState([]);

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingSwaps, setLoadingSwaps] = useState(true);

  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [updatingSwap, setUpdatingSwap] = useState(null);

  useEffect(() => {
    if (!sellerName) {
      setLoadingOrders(false);
      setLoadingSwaps(false);
      return;
    }

    const encodedSellerName = encodeURIComponent(sellerName);

    // =====================================================
    // FETCH SELLER ORDERS
    // =====================================================

    fetch(
      `http://localhost:3000/api/orders/seller/${encodedSellerName}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
      })
      .catch((error) => {
        console.error("Error fetching seller orders:", error);
        setOrders([]);
      })
      .finally(() => {
        setLoadingOrders(false);
      });

    // =====================================================
    // FETCH SELLER SWAP REQUESTS
    // =====================================================

    fetch(
      `http://localhost:3000/api/swap-requests/seller/${encodedSellerName}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSwapRequests(data.requests || []);
      })
      .catch((error) => {
        console.error("Error fetching seller swap requests:", error);
        setSwapRequests([]);
      })
      .finally(() => {
        setLoadingSwaps(false);
      });
  }, [sellerName]);

  // =====================================================
  // UPDATE ORDER STATUS
  // =====================================================

  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId);

      const response = await fetch(
        `http://localhost:3000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to update order status.");
        return;
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: result.order.status,
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Unable to update order status.");
    } finally {
      setUpdatingOrder(null);
    }
  };

  // =====================================================
  // UPDATE SWAP REQUEST STATUS
  // =====================================================

  const updateSwapStatus = async (requestId, status) => {
    try {
      setUpdatingSwap(requestId);

      const response = await fetch(
        `http://localhost:3000/api/swap-requests/${requestId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Failed to update swap request status."
        );
        return;
      }

      setSwapRequests((previousRequests) =>
        previousRequests.map((request) =>
          request._id === requestId
            ? {
                ...request,
                status: result.request.status,
              }
            : request
        )
      );
    } catch (error) {
      console.error(
        "Error updating swap request status:",
        error
      );

      alert("Unable to update swap request status.");
    } finally {
      setUpdatingSwap(null);
    }
  };

  // =====================================================
  // SUMMARY DATA
  // =====================================================

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "PLACED" ||
      order.status === "CONFIRMED"
  );

  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  );

  const pendingSwaps = swapRequests.filter(
    (request) => request.status === "PENDING"
  );

  // =====================================================
  // ORDER ACTION BUTTONS
  // =====================================================

  const renderOrderActions = (order) => {
    if (order.status === "PLACED") {
      return (
        <div className="flex flex-wrap gap-2 mt-5">

          <button
            onClick={() =>
              updateOrderStatus(order._id, "CONFIRMED")
            }
            disabled={updatingOrder === order._id}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            <CheckCircle size={17} />

            {updatingOrder === order._id
              ? "Updating..."
              : "Confirm Order"}
          </button>

          <button
            onClick={() =>
              updateOrderStatus(order._id, "CANCELLED")
            }
            disabled={updatingOrder === order._id}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
          >
            <XCircle size={17} />
            Cancel Order
          </button>

        </div>
      );
    }

    if (order.status === "CONFIRMED") {
      return (
        <div className="flex flex-wrap gap-2 mt-5">

          <button
            onClick={() =>
              updateOrderStatus(order._id, "SHIPPED")
            }
            disabled={updatingOrder === order._id}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
          >
            <Truck size={17} />

            {updatingOrder === order._id
              ? "Updating..."
              : "Mark as Shipped"}
          </button>

        </div>
      );
    }

    if (order.status === "SHIPPED") {
      return (
        <div className="flex flex-wrap gap-2 mt-5">

          <button
            onClick={() =>
              updateOrderStatus(order._id, "DELIVERED")
            }
            disabled={updatingOrder === order._id}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            <CheckCircle size={17} />

            {updatingOrder === order._id
              ? "Updating..."
              : "Mark as Delivered"}
          </button>

        </div>
      );
    }

    if (order.status === "DELIVERED") {
      return (
        <div className="mt-5 text-green-600 font-semibold flex items-center gap-2">
          <CheckCircle size={18} />
          Order Delivered
        </div>
      );
    }

    if (order.status === "CANCELLED") {
      return (
        <div className="mt-5 text-red-600 font-semibold flex items-center gap-2">
          <XCircle size={18} />
          Order Cancelled
        </div>
      );
    }

    return null;
  };

  // =====================================================
  // SWAP ACTION BUTTONS
  // =====================================================

  const renderSwapActions = (request) => {
    if (request.status === "PENDING") {
      return (
        <div className="flex flex-wrap gap-2 mt-5">

          <button
            onClick={() =>
              updateSwapStatus(request._id, "ACCEPTED")
            }
            disabled={updatingSwap === request._id}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            <CheckCircle size={17} />

            {updatingSwap === request._id
              ? "Updating..."
              : "Accept Swap"}
          </button>

          <button
            onClick={() =>
              updateSwapStatus(request._id, "REJECTED")
            }
            disabled={updatingSwap === request._id}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
          >
            <XCircle size={17} />
            Reject Swap
          </button>

        </div>
      );
    }

    if (request.status === "ACCEPTED") {
      return (
        <div className="flex flex-wrap gap-2 mt-5">

          <button
            onClick={() =>
              updateSwapStatus(request._id, "COMPLETED")
            }
            disabled={updatingSwap === request._id}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            <CheckCircle size={17} />

            {updatingSwap === request._id
              ? "Updating..."
              : "Complete Swap"}
          </button>

        </div>
      );
    }

    if (request.status === "REJECTED") {
      return (
        <div className="mt-5 text-red-600 font-semibold flex items-center gap-2">
          <XCircle size={18} />
          Swap Request Rejected
        </div>
      );
    }

    if (request.status === "COMPLETED") {
      return (
        <div className="mt-5 text-green-600 font-semibold flex items-center gap-2">
          <CheckCircle size={18} />
          Swap Completed
        </div>
      );
    }

    if (request.status === "CANCELLED") {
      return (
        <div className="mt-5 text-gray-600 font-semibold flex items-center gap-2">
          <XCircle size={18} />
          Swap Cancelled
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Header showSearchBar={false} />

      <main className="min-h-screen bg-gray-50 px-4 py-10">

        <div className="max-w-7xl mx-auto">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline mb-6"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="mb-8">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Seller Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome, {sellerName || "Seller"} 👋
            </p>

            <p className="text-gray-500 mt-1">
              Manage your clothing orders and swap requests.
            </p>

          </div>

          {/* ================================================= */}
          {/* SUMMARY CARDS */}
          {/* ================================================= */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

            {/* Total Orders */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Orders
                  </p>

                  <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {orders.length}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <ShoppingBag
                    size={25}
                    className="text-purple-600"
                  />
                </div>

              </div>

            </div>

            {/* Pending Orders */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Pending Orders
                  </p>

                  <h2 className="text-3xl font-bold text-orange-500 mt-2">
                    {pendingOrders.length}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock
                    size={25}
                    className="text-orange-500"
                  />
                </div>

              </div>

            </div>

            {/* Swap Requests */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Swap Requests
                  </p>

                  <h2 className="text-3xl font-bold text-purple-600 mt-2">
                    {swapRequests.length}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <RefreshCcw
                    size={25}
                    className="text-purple-600"
                  />
                </div>

              </div>

            </div>

            {/* Delivered */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Delivered Orders
                  </p>

                  <h2 className="text-3xl font-bold text-green-600 mt-2">
                    {deliveredOrders.length}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle
                    size={25}
                    className="text-green-600"
                  />
                </div>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* INCOMING ORDERS */}
          {/* ================================================= */}

          <section className="mb-12">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center">
                <ShoppingBag
                  size={23}
                  className="text-purple-600"
                />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Incoming Orders
                </h2>

                <p className="text-gray-500 text-sm">
                  Orders placed for your clothing.
                </p>

              </div>

            </div>

            {loadingOrders ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-500">
                Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">

                <Package
                  size={45}
                  className="mx-auto text-gray-400"
                />

                <h3 className="text-xl font-semibold text-gray-700 mt-4">
                  No orders yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Orders from buyers will appear here.
                </p>

              </div>
            ) : (
              <div className="space-y-5">

                {orders.map((order) => (

                  <div
                    key={order._id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5"
                  >

                    <div className="flex flex-col md:flex-row gap-5">

                      <img
                        src={order.productImage}
                        alt={order.productTitle}
                        className="w-full md:w-36 h-40 object-contain bg-gray-50 rounded-xl border border-gray-100"
                      />

                      <div className="flex-1">

                        <div className="flex flex-wrap justify-between gap-3">

                          <h3 className="text-xl font-bold text-gray-800">
                            {order.productTitle}
                          </h3>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold h-fit ${
                              order.status === "DELIVERED"
                                ? "bg-green-100 text-green-700"
                                : order.status === "CANCELLED"
                                ? "bg-red-100 text-red-700"
                                : order.status === "SHIPPED"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "CONFIRMED"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status}
                          </span>

                        </div>

                        <p className="text-green-600 text-xl font-bold mt-3">
                          ₹ {order.price}
                        </p>

                        <div className="grid md:grid-cols-2 gap-2 mt-4 text-sm">

                          <p className="text-gray-600">
                            <strong>Buyer:</strong>{" "}
                            {order.buyerName}
                          </p>

                          <p className="text-gray-600">
                            <strong>Email:</strong>{" "}
                            {order.buyerEmail}
                          </p>

                          <p className="text-gray-600">
                            <strong>Location:</strong>{" "}
                            {order.buyerLocation ||
                              "Not provided"}
                          </p>

                          <p className="text-gray-600">
                            <strong>Order ID:</strong>{" "}
                            {order._id}
                          </p>

                        </div>

                        <p className="text-gray-500 text-sm mt-3">
                          Ordered on:{" "}
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>

                        {renderOrderActions(order)}

                      </div>

                    </div>

                  </div>

                ))}

              </div>
            )}

          </section>

          {/* ================================================= */}
          {/* INCOMING SWAP REQUESTS */}
          {/* ================================================= */}

          <section>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center">
                <RefreshCcw
                  size={23}
                  className="text-purple-600"
                />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Incoming Swap Requests
                </h2>

                <p className="text-gray-500 text-sm">
                  People who want to exchange clothing with you.
                </p>

              </div>

            </div>

            {loadingSwaps ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-500">
                Loading swap requests...
              </div>
            ) : swapRequests.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">

                <RefreshCcw
                  size={45}
                  className="mx-auto text-gray-400"
                />

                <h3 className="text-xl font-semibold text-gray-700 mt-4">
                  No swap requests yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Swap requests for your clothing will appear here.
                </p>

              </div>
            ) : (
              <div className="space-y-5">

                {swapRequests.map((request) => (

                  <div
                    key={request._id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5"
                  >

                    <div className="flex flex-col md:flex-row gap-5">

                      <img
                        src={request.productImage}
                        alt={request.productTitle}
                        className="w-full md:w-36 h-40 object-contain bg-gray-50 rounded-xl border border-gray-100"
                      />

                      <div className="flex-1">

                        <div className="flex flex-wrap justify-between gap-3">

                          <h3 className="text-xl font-bold text-gray-800">
                            {request.productTitle}
                          </h3>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold h-fit ${
                              request.status === "ACCEPTED"
                                ? "bg-green-100 text-green-700"
                                : request.status === "REJECTED"
                                ? "bg-red-100 text-red-700"
                                : request.status === "COMPLETED"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {request.status}
                          </span>

                        </div>

                        <p className="text-purple-600 font-semibold mt-3">
                          Offered:{" "}
                          {request.offeredClothing}
                        </p>

                        <div className="grid md:grid-cols-2 gap-2 mt-4 text-sm">

                          <p className="text-gray-600">
                            <strong>Requester:</strong>{" "}
                            {request.requesterName}
                          </p>

                          <p className="text-gray-600">
                            <strong>Email:</strong>{" "}
                            {request.requesterEmail}
                          </p>

                          <p className="text-gray-600">
                            <strong>Location:</strong>{" "}
                            {request.requesterLocation ||
                              "Not provided"}
                          </p>

                          <p className="text-gray-600">
                            <strong>Request ID:</strong>{" "}
                            {request._id}
                          </p>

                        </div>

                        {request.message && (
                          <div className="mt-4 bg-gray-50 rounded-xl p-4">

                            <p className="text-sm text-gray-500">
                              <strong>Message:</strong>
                            </p>

                            <p className="text-gray-700 mt-1">
                              {request.message}
                            </p>

                          </div>
                        )}

                        <p className="text-gray-500 text-sm mt-3">
                          Requested on:{" "}
                          {new Date(
                            request.createdAt
                          ).toLocaleDateString()}
                        </p>

                        {/* Swap Actions */}
                        {renderSwapActions(request)}

                      </div>

                    </div>

                  </div>

                ))}

              </div>
            )}

            {/* Pending Summary */}

            {pendingSwaps.length > 0 && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">

                <p className="text-yellow-800 font-semibold">
                  You have {pendingSwaps.length} pending swap request
                  {pendingSwaps.length > 1 ? "s" : ""}.
                </p>

              </div>
            )}

          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}