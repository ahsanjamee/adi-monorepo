const express = require("express");
const {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controller/contactController");
const router = express.Router();

// POST: Add a new contact entry
router.post("/add", addContact);

// GET: Get all contact entries
router.get("/all", getAllContacts);

// GET: Get a contact entry by ID
router.get("/:id", getContactById);

// PUT: Update a contact entry by ID
router.put("/:id", updateContact);

// DELETE: Delete a contact entry by ID
router.delete("/:id", deleteContact);

module.exports = router;
