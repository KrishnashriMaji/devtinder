const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      required: true,
      // enum: {
      //   values : ["Male", "Female", "Other"],
      //   message : `${VALUE} is not a valid gender type`
      // },
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

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.pre("save", async function (next) {
  const user = this;

  if (this.isModified("password")) {
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
  }
  next();
});

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id },
    process.env?.JWT_SECRECT_KEY,
    {
      expiresIn: "1d",
    }
  );

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );

  return isPasswordValid;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
