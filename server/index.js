const express = require("express");
const APP = express();
const AUTH_ROUTE = require("./routes/auth");
const FORM_ROUTE = require("./routes/form");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

//Allow CORS
APP.use(cors());

//Static Folder
APP.use(express.static("public"));

//Body Parser Middleware
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));

//Dot Env Middleware
dotenv.config();

// Router
APP.use("/auth", AUTH_ROUTE);
APP.use("/form", FORM_ROUTE);

// Server React build
APP.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

APP.listen(PORT, () => {
  console.log(`Server Running AT PORT ${PORT}`);
});
