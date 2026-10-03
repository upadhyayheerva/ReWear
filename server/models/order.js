const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReWearProduct",
      required: true,
    },

    productTitle: {
      type: String,
      required: true,
    },

    productImage: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    buyerName: {
      type: String,
      required: true,
    },

    buyerEmail: {
      type: String,
      required: true,
    },

    buyerLocation: {
      type: String,
      default: "",
    },

    sellerName: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PLACED",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);