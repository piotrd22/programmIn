const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    date: {
      type: Date,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      default: "",
      required: true,
    },
    phone: {
      type: String,
      max: 20,
    },
    experience: {
      type: String,
      max: 100,
      default: "",
    },
    skills: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      max: 100,
      default: "",
    },
    city: {
      type: String,
      max: 50,
      default: "",
    },
    description: {
      type: String,
      max: 200,
      default: "",
    },
    githuburl: {
      type: String,
      max: 100,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    backPicture: {
      type: String,
      default: "",
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
