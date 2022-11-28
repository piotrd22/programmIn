const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("common"));
app.use(helmet());

//ROUTES
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use("/users", usersRouter);
app.use("/auth", authRouter);

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("Connected with DB! :)");
});

app.listen(process.env.PORT, () => {
  console.log("Backend is alive!");
});
