import requests from "./httpServices";

const CustomerServices = {
  customerLogin: async (body) => {
    return requests.post("/customer/login", body);
  },

  verifyEmailAddress: async (body) => {
    return requests.post("/customer/verify-email", body);
  },

  verifyPhone: async (body) => {
    return requests.post("/customer/verify-phone", body);
  },

  verifyPhoneForLogin: async (body) => {
    return requests.post("/customer/verify-login", body);
  },

  registerCustomer: async (body) => {
    return requests.post(`/customer/register-customer`, body);
  },

  verifyOtpForPassword: async (body) => {
    return requests.post(`/customer/verify-otp`, body);
  },

  signUpWithProvider(token, body) {
    return requests.post(`/customer/signup/${token}`, body);
  },

  forgetPassword: async (body) => {
    return requests.put("/customer/forget-password", body);
  },

  resetPassword: async (body) => {
    return requests.put("/customer/reset-password", body);
  },

  changePassword: async (body) => {
    return requests.post("/customer/change-password", body);
  },

  updateCustomer: async (id, body) => {
    return requests.put(`/customer/${id}`, body);
  },
};

export default CustomerServices;
