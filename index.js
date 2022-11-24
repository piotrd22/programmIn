const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("Connected with DB! :)");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Backend is alive!");
});
