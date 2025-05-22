const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" ,error:"NO_TOKEN_PROVIDED"});
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Token expired or invalid" });
    }
    req.user = user;
    next();
  });
};