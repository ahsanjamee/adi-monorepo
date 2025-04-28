import requests from "./httpService";

const FeedbackServices = {
  getAllFeedbacks: async () => {
    return requests.get("/contact-form/all");
  },
  deleteFeedback: async (id) => {
    return requests.delete(`/contact-form/${id}`);
  },
};

export default FeedbackServices;
