const mongoose = require("mongoose");

const rewearProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    listingType: {
      type: String,
      enum: ["SELL", "SWAP"],
      default: "SELL",
    },

    seller: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReWearProduct", rewearProductSchema);