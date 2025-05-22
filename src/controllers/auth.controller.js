const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const { generateTokens } = require("../utils/jwt");

// REGISTER
exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    // Known validation errors from service layer
    if (err.code === "EMAIL_ALREADY_REGISTERED") {
      return res.status(409).json({
        success: false,
        error: "EMAIL_ALREADY_REGISTERED",
        message: "Email is already registered.",
      });
    }

    return res.status(400).json({
      success: false,
      error: "REGISTRATION_FAILED",
      message: err.message || "User registration failed due to internal server error.",
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await authService.loginUser(
      req.body
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, sameSite: "Lax" })
      .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "Lax" })
      .json({
        success: true,
        message: "Login successful.",
        user: user,
      });
  } catch (err) {
   if(err.code ==="EMAIL_NOT_FOUND"){
    return res.status(404).json({
      success: false,
      message: err.message,
      code: err.code,
      error:err
    });
   }
   else if (err.code === "INVALID_PASSWORD") {
     return res.status(401).json({
       success: false,
       message: err.message,
       code: err.code,
       error: err,
     });
   }
   else{
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
   }
  }
};

// REFRESH TOKEN
exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      error: "NO_REFRESH_TOKEN",
      message: "Refresh token is missing.",
    });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: "INVALID_REFRESH_TOKEN",
          message: "Refresh token is invalid or expired.",
        });
      }

      const user = await authService.getUserById(decoded.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "USER_NOT_FOUND",
          message: "User not found.",
        });
      }

      const {accessToken} = generateTokens(user);
      return res
        .cookie("accessToken", accessToken, { httpOnly: true, sameSite: "Lax" })
        .json({
          success: true,
          message: "Access token refreshed successfully.",
          accessToken,
        });
    }
  );
};

// LOGOUT
exports.logout = (req, res) => {
  res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};



