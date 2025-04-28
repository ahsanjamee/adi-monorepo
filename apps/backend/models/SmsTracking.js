const mongoose = require("mongoose");

const smsTrackingSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    recipientNumber: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: [
        "OTP",
        "ORDER_NOTIFICATION_CUSTOMER",
        "ORDER_NOTIFICATION_ADMIN",
        "OTHER",
      ],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      required: true,
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("SmsTracking", smsTrackingSchema);
