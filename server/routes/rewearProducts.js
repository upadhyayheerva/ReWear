const express = require("express");
const router = express.Router();

const ReWearProduct = require("../models/rewearProduct");

// Get all ReWear clothing products
router.get("/", async (req, res) => {
  try {
    const products = await ReWearProduct.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching ReWear products:", error);

    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
});

// Get single ReWear product
router.get("/:id", async (req, res) => {
  try {
    const product = await ReWearProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);

    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
});

// Add new ReWear clothing product
router.post("/", async (req, res) => {
  try {
    const product = new ReWearProduct(req.body);

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);

    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
});

module.exports = router;