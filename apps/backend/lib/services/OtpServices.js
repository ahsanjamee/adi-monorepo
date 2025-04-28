require("dotenv").config();
const https = require("https");
const crypto = require("crypto");
const Setting = require("../../models/Setting");
const SmsTracking = require("../../models/SmsTracking");

//common send message function
async function sendSms(phoneNumbers, message, messageType = "OTHER") {
  const fetch = (await import("node-fetch")).default;
  const senderId = "8809601004762";

  // Join the phone numbers into a comma-separated string
  const mobileNumberString = Array.isArray(phoneNumbers)
    ? phoneNumbers.map((phone) => `88${phone.trim()}`).join(",")
    : `88${phoneNumbers.trim()}`;

  const payload = {
    UserName: "nsiddiquey@gmail.com",
    Apikey: "X06C7YOZZII8ODN",
    MobileNumber: mobileNumberString,
    SenderName: senderId,
    TransactionType: "T",
    Message: message,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  try {
    const response = await fetch(
      "https://api.mimsms.com/api/SmsSending/SMS",
      options
    );
    const result = await response.json();
    console.log(result);

    // Track SMS for each recipient
    const phoneNumbersArray = Array.isArray(phoneNumbers)
      ? phoneNumbers
      : [phoneNumbers];

    for (const phone of phoneNumbersArray) {
      await SmsTracking.create({
        companyName: "Adi",
        recipientNumber: phone,
        message,
        messageType,
        status: result.isError ? "FAILED" : "SUCCESS",
      });
    }

    return result;
  } catch (error) {
    console.error("Error sending SMS:", error);

    // Track failed SMS
    const phoneNumbersArray = Array.isArray(phoneNumbers)
      ? phoneNumbers
      : [phoneNumbers];

    for (const phone of phoneNumbersArray) {
      await SmsTracking.create({
        companyName: "Adi",
        recipientNumber: phone,
        message,
        messageType,
        status: "FAILED",
      });
    }

    throw error;
  }
}

const otpStore = new Map(); // In-memory store for OTPs

//otp send function
async function sendOtp(phone) {
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore.set(phone, otp);
  const message = `Adi এর জন্য আপনার ভেরিফিকেশন কোড ${otp}`;

  sendSms(phone, message, "OTP");
}

//order notification function
async function sendOrderNotifications(userPhone, orderId) {
  // Find the settings document in the MongoDB collection
  const settings = await Setting.findOne({ name: "globalSetting" });

  // Message to send
  const userMessage = `Your ${settings?.setting?.company_name} order has been placed and the invoice Id is #${orderId}.`;
  const adminMessage = `New order placed. Invoice ID: #${orderId}.`;

  try {
    // Send SMS to the user
    await sendSms(userPhone, userMessage, "ORDER_NOTIFICATION_CUSTOMER");

    if (settings && settings.setting?.contact) {
      const adminContacts = settings.setting.contact_for_sms;
      // Send SMS to all admin contacts
      await sendSms(adminContacts, adminMessage, "ORDER_NOTIFICATION_ADMIN");
    } else {
      console.error("No admin contacts found in settings.");
    }
  } catch (error) {
    console.error("Error sending order notifications:", error);
  }
}

function verifyOtp(phone, otp) {
  const storedOtp = otpStore.get(phone);
  if (storedOtp === otp) {
    otpStore.delete(phone); // Remove OTP after successful verification
    return true;
  }
  return false;
}

module.exports = { sendOtp, verifyOtp, sendOrderNotifications };
