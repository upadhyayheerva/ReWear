const express = require("express");
const router = express.Router();

const SwapRequest = require("../models/swapRequest");
const ReWearProduct = require("../models/rewearProduct");

// =====================================================
// CREATE A NEW SWAP REQUEST
// =====================================================

router.post("/", async (req, res) => {
  try {
    const {
      productId,
      requesterName,
      requesterEmail,
      requesterLocation,
      offeredClothing,
      message,
    } = req.body;

    if (
      !productId ||
      !requesterName ||
      !requesterEmail ||
      !offeredClothing
    ) {
      return res.status(400).json({
        success: false,
        message: "Product and requester information are required.",
      });
    }

    const product = await ReWearProduct.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Clothing item not found.",
      });
    }

    if (product.listingType !== "SWAP") {
      return res.status(400).json({
        success: false,
        message: "This clothing item is not available for swap.",
      });
    }

    const swapRequest = new SwapRequest({
      productId: product._id,
      productTitle: product.title,
      productImage: product.image,

      requesterName,
      requesterEmail,
      requesterLocation: requesterLocation || "",

      offeredClothing,
      message: message || "",

      sellerName: product.seller?.name || "",

      status: "PENDING",
    });

    const savedRequest = await swapRequest.save();

    res.status(201).json({
      success: true,
      message: "Swap request sent successfully!",
      swapRequest: savedRequest,
    });
  } catch (error) {
    console.error("Error creating swap request:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send swap request.",
      error: error.message,
    });
  }
});

// =====================================================
// GET SWAP REQUESTS BY REQUESTER EMAIL
// =====================================================

router.get("/requester/:email", async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      requesterEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Error fetching swap requests:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch swap requests.",
      error: error.message,
    });
  }
});

// =====================================================
// GET SWAP REQUESTS RECEIVED BY SELLER
// =====================================================

router.get("/seller/:sellerName", async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      sellerName: req.params.sellerName,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Error fetching seller swap requests:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch seller swap requests.",
      error: error.message,
    });
  }
});

// =====================================================
// UPDATE SWAP REQUEST STATUS
// =====================================================

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "PENDING",
      "ACCEPTED",
      "REJECTED",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid swap request status.",
      });
    }

    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: "Swap request not found.",
      });
    }

    swapRequest.status = status;

    const updatedRequest = await swapRequest.save();

    res.status(200).json({
      success: true,
      message: "Swap request status updated successfully.",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating swap request status:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update swap request status.",
      error: error.message,
    });
  }
});

module.exports = router;