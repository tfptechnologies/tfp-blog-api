require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3003,
  jwtSecret: process.env.JWT_SECRET,
};
