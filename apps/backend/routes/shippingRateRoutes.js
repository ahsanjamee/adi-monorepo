const express = require("express");
const {
  addShippingRate,
  getShippingRateByCategoryAndCity,
  getAllShippingRates,
  updateShippingRate,
  deleteShippingRate,
  getShippingRateById,
} = require("../controller/shippingRateController");
const router = express.Router();

// POST: Add a new shipping rate
router.post("/add", addShippingRate);

// GET: Get shipping rates by category and city
router.get("/:categoryId/:city", getShippingRateByCategoryAndCity);

// GET: Get all shipping rates
router.get("/all", getAllShippingRates);

// GET: Get a shipping rate by ID
router.get("/:id", getShippingRateById);

// PUT: Update a shipping rate
router.put("/:id", updateShippingRate);

// DELETE: Delete a shipping rate
router.delete("/:id", deleteShippingRate);

module.exports = router;
