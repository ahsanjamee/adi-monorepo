const Contact = require("../models/Contact");

// Add a new contact entry
const addContact = async (req, res) => {
  try {
    const { name, subject, message, phone, email } = req.body;

    // Create a new Contact object
    const newContact = new Contact({
      name,
      subject,
      message,
      phone,
      ...(email && { email }), // Only include email if it's provided
    });

    // Save the new contact to the database
    await newContact.save();

    res.status(201).json({
      status: 201,
      newContact,
      message: "Contact entry added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding contact entry",
      error: err.message,
    });
  }
};

// Get all contact entries
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching contacts",
      error: err.message,
    });
  }
};

// Get a contact entry by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching contact entry",
      error: err.message,
    });
  }
};

// Update a contact entry by ID
const updateContact = async (req, res) => {
  try {
    const { name, subject, message, phone, email } = req.body;

    // Update the contact entry
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name,
        subject,
        message,
        phone,
        ...(email && { email }), // Only include email if it's provided
      },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      updatedContact,
      message: "Contact entry updated successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating contact entry",
      error: err.message,
    });
  }
};

// Delete a contact entry by ID
const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact entry deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting contact entry",
      error: err.message,
    });
  }
};

module.exports = {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
