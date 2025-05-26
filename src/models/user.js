const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, maxLength: 20 },
    lastName: { type: String, maxLength: 20 },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not correct formated.");
        }
      },
    },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(value) {
        if (!["Male", "Female", "Other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    skill: {
      type: [String],
      validate(value) {
        if (value.length > 2) {
          throw new Error("You can add only 2 skills.");
        }
      },
    },
    about: { type: String, default: "This is a default about of a user" },
    createdDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
