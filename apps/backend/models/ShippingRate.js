const mongoose = require("mongoose");

const shippingRateSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
    },
    weight: {
      type: Number,
      required: true, // Weight in kg
    },
    baseCharge: {
      type: Number,
      required: false, // Base delivery charge
    },
    ratePerKg: {
      type: Number,
      required: true, // Rate per kg after 0.5 kg
    },
    city: {
      type: String,
      enum: ["inside_dhaka", "outside_dhaka"], // City criteria
      required: true,
    },
    // id: {
    //   type: String,
    //   required: false,
    // },
  },
  {
    timestamps: true,
  }
);

const ShippingRate = mongoose.model("ShippingRate", shippingRateSchema);

module.exports = ShippingRate;
