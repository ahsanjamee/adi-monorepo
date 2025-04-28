// const bcrypt = require("bcryptjs");
const Customer = require("../../models/Customer");

async function createUser({ name, email, phone }) {
  // const hashedPassword = await bcrypt.hash(password, 10);
  // const user = new Customer({ name, email, phone, password: hashedPassword });
  const data = { name, email, phone };
  if (email === "") delete data.email;
  const user = new Customer(data);
  return user.save();
}

async function getUserByPhone(phone) {
  return Customer.findOne({ phone });
}

module.exports = { createUser, getUserByPhone };
