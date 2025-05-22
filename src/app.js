const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const errorLogger = require("./middlewares/error.middleware");

//Docs
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Load the main Swagger file
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");



const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); //For localhost
app.use(cookieParser()); //For cookies
app.use(express.json()); //For JSON parsing

app.use("/api/v1", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // For swagger docs


app.get("/", (req, res) => {
  res.send("Welcome to the TFP Blogs API");
});
app.get("/api/v1/", (req, res) => {
  res.send("TFP Blogs API Version 1.0.0");
});


app.use(errorLogger);
module.exports = app;
