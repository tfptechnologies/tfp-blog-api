const jwt = require("jsonwebtoken");
const config = require("../config/config");


const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;


  exports.generateTokens = (user) => {
      const accessToken = jwt.sign(
        { id: user.id,email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, {
        expiresIn: "7d",
      });
      return { accessToken, refreshToken };
    };