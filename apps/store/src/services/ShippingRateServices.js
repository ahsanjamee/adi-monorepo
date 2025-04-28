import requests from "./httpServices";

const ShippingRateServices = {
  getShippingRateByCategoryAndCity: async (categoryId, city) => {
    return requests.get(`/shipping-rate/${categoryId}/${city}`);
  },
};

export default ShippingRateServices;
