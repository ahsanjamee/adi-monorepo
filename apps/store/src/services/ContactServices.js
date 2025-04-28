import requests from "./httpServices";

const ContactServices = {
  addContact: async (body) => {
    return requests.post("/contact-form/add", body);
  },
};

export default ContactServices;
