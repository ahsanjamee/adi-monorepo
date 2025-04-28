import requests from "./httpService";

const ShippingRateServices = {
  getAllShippingRates: async () => {
    return requests.get("/shipping-rate/all");
  },

  getShippingRateById: async (id) => {
    return requests.get(`/shipping-rate/${id}`);
  },

  addShippingRate: async (body) => {
    return requests.post("/shipping-rate/add", body);
  },

  addAllShippingRate: async (body) => {
    return requests.post("/shipping-rate/add/all", body);
  },

  updateShippingRate: async (id, body) => {
    return requests.put(`/shipping-rate/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/shipping-rate/status/${id}`, body);
  },

  deleteShippingRate: async (id) => {
    return requests.delete(`/shipping-rate/${id}`);
  },

  updateManyShippingRate: async (body) => {
    return requests.patch("/shipping-rate/update/many", body);
  },

  deleteManyShippingRate: async (body) => {
    return requests.patch("/shipping-rate/delete/many", body);
  },
};

export default ShippingRateServices;
