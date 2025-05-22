const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/error.log");

const errorLogger = (err,req, res, next) => {
  console.log("Middle Were Called!")
  // Default to 500 if statusCode is not explicitly set
  const status = res.statusCode >= 400 ? res.statusCode : 500;

  // Only log 5xx internal server errors
  if (status >= 500) {
    const errorDetails = `
[${new Date().toISOString()}]
${req.method} ${req.originalUrl}
Status: ${status}
Error Message: ${err.message}
Stack: ${err.stack}

-------------------------------------------------------
`;

    // Log to console
    console.error(errorDetails);

    // Optional: Log to file
    fs.appendFile(logFilePath, errorDetails, (fileErr) => {
      if (fileErr) {
        console.error("Failed to write error to log file:", fileErr);
      }
    });
  }

  next(err); // Continue to next error handler
};


module.exports = errorLogger;