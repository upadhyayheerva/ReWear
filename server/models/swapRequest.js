const mongoose = require("mongoose");

const swapRequestSchema = new mongoose.Schema(
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

    requesterName: {
      type: String,
      required: true,
    },

    requesterEmail: {
      type: String,
      required: true,
    },

    requesterLocation: {
      type: String,
      default: "",
    },

    offeredClothing: {
      type: String,
      required: true,
    },

    message: {
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
        "PENDING",
        "ACCEPTED",
        "REJECTED",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SwapRequest", swapRequestSchema);