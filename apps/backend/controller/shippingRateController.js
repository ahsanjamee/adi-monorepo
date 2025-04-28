const ShippingRate = require("../models/ShippingRate");

// Add a new shipping rate
const addShippingRate = async (req, res) => {
  try {
    const { categoryId, weight, baseCharge, ratePerKg, city } = req.body;

    const rate = await ShippingRate.findOne({
      categoryId,
      city,
    });

    if (rate) {
      return res.status(400).json({
        message: "Shipping rate already exists for this category and city",
      });
    }

    // Create a new ShippingRate object
    const newRateData = {
      categoryId,
      weight,
      ratePerKg,
      city,
    };

    // Add baseCharge only if it is provided
    if (baseCharge !== undefined) {
      newRateData.baseCharge = baseCharge;
    }

    const newRate = new ShippingRate(newRateData);

    await newRate.save();
    res.status(201).send({
      newRate: newRate,
      message: "Shipping rate added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding shipping rate",
      error: err.message,
    });
  }
};

// Fetch shipping rates by category and city
const getShippingRateByCategoryAndCity = async (req, res) => {
  try {
    const { categoryId, city } = req.params;
    const rate = await ShippingRate.findOne({
      categoryId,
      city,
    });

    //TODO
    if (!rate) {
      // return res.status(404).json({
      //   message: "Shipping rate not found for this category and city",
      // });
      const zeroRate = {
        weight: 0,
        ratePerKg: 0,
        baseCharge: 0,
        city: city,
        categoryId: categoryId,
      };

      return res.status(200).json(zeroRate);
    }

    res.status(200).json(rate);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching shipping rate",
      error: err.message,
    });
  }
};

const getShippingRateById = async (req, res) => {
  try {
    const { id } = req.params;

    const rate = await ShippingRate.findOne({
      _id: id,
    });

    if (!rate) {
      return res.status(404).json({
        message: "Shipping rate not found for this id",
      });
    }

    res.status(200).json(rate);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching shipping rate",
      error: err.message,
    });
  }
};

const getAllShippingRates = async (req, res) => {
  try {
    const rates = await ShippingRate.find();
    res.status(200).json(rates);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching shipping rates",
      error: err.message,
    });
  }
};

// Update a shipping rate
const updateShippingRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { baseCharge, ...updateFields } = req.body;

    // Ensure required fields are not missing (except baseCharge which is optional)
    if (
      !updateFields.categoryId ||
      !updateFields.weight ||
      !updateFields.ratePerKg ||
      !updateFields.city
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the update object
    const updateData = { ...updateFields };

    // Only add baseCharge if it's provided in the request body
    if (baseCharge !== undefined) {
      updateData.baseCharge = baseCharge;
    }

    // Find and update the shipping rate by ID
    const updatedRate = await ShippingRate.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    if (!updatedRate) {
      return res.status(404).json({ message: "Shipping rate not found" });
    }

    res.status(200).json({
      message: "Shipping rate updated successfully",
      updatedRate,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating shipping rate",
      error: err.message,
    });
  }
};

// Delete a shipping rate
const deleteShippingRate = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRate = await ShippingRate.findByIdAndDelete(id);

    if (!deletedRate)
      return res.status(404).json({ message: "Shipping rate not found" });

    res.status(200).json({ message: "Shipping rate deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting shipping rate", error: err.message });
  }
};

module.exports = {
  getShippingRateByCategoryAndCity,
  getAllShippingRates,
  updateShippingRate,
  deleteShippingRate,
  addShippingRate,
  getShippingRateById,
};
