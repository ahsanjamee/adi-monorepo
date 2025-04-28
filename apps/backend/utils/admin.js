const bcrypt = require("bcryptjs");
const admins = [
  {
    name: {
      en: "Super admin",
    },
    image: "https://i.ibb.co/d294W8Y/team-4.jpg",
    email: "admin@adi.com",
    password: bcrypt.hashSync("4WxaTHQ3P6sNj9S"),
    phone: "12345678",
    role: "Admin",
    joiningData: new Date(),
  },
];

module.exports = admins;
