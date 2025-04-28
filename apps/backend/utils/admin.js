const bcrypt = require("bcryptjs");
const admins = [
  {
    name: {
      en: "Super admin",
    },
    image: "https://i.ibb.co/d294W8Y/team-4.jpg",
    email: "admin@auction-pikary.com",
    password: bcrypt.hashSync("3P6sNj9S4WxaTHQ"),
    phone: "12345678",
    role: "Admin",
    joiningData: new Date(),
  },
];

module.exports = admins;
