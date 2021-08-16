const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const csvRoute = require("./routes/csv");

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", csvRoute);

app.get("/", (req, res) => {
  return res.send("Home page");
});

app.listen(port, () => console.log("app is up and running"));
