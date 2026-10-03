const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const ReWearProduct = require("../models/rewearProduct");

// =====================================================
// CREATE A NEW ORDER
// =====================================================

router.post("/", async (req, res) => {
  try {
    const {
      productId,
      buyerName,
      buyerEmail,
      buyerLocation,
    } = req.body;

    if (!productId || !buyerName || !buyerEmail) {
      return res.status(400).json({
        success: false,
        message: "Product and buyer information are required.",
      });
    }

    const product = await ReWearProduct.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (product.listingType === "SWAP") {
      return res.status(400).json({
        success: false,
        message: "This clothing item is available for swap only.",
      });
    }

    const order = new Order({
      productId: product._id,
      productTitle: product.title,
      productImage: product.image,
      price: product.price,

      buyerName,
      buyerEmail,
      buyerLocation: buyerLocation || "",

      sellerName: product.seller?.name || "",

      status: "PLACED",
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({
      success: false,
      message: "Failed to place order.",
      error: error.message,
    });
  }
});

// =====================================================
// GET ORDERS BY BUYER EMAIL
// =====================================================

router.get("/buyer/:email", async (req, res) => {
  try {
    const orders = await Order.find({
      buyerEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching buyer orders:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
      error: error.message,
    });
  }
});

// =====================================================
// GET ORDERS RECEIVED BY SELLER
// =====================================================

router.get("/seller/:sellerName", async (req, res) => {
  try {
    const orders = await Order.find({
      sellerName: req.params.sellerName,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching seller orders:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch seller orders.",
      error: error.message,
    });
  }
});

// =====================================================
// UPDATE ORDER STATUS
// =====================================================

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "PLACED",
      "CONFIRMED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.status = status;

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status.",
      error: error.message,
    });
  }
});

module.exports = router;