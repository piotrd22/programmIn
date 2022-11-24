const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  surname: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
});
