const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const {
  validateSignUpData,
  validateEditPassword,
} = require("../utils/validate");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");

// Login
authRouter.get("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ emailId: email });
    if (!user) {
      throw new Error("Invalid Credential!!");
    }
    const isPasswordValid = await user.validatePassword(password); // schema helper method

    if (isPasswordValid) {
      var token = await user.getJWT(); // schema helper method

      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.json({ message: "Login Successfully !!" });
    } else {
      throw new Error("Invalid Credential!!");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Insert
authRouter.post("/user/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: password,
      age: age,
      gender: gender,
    });
    await user.save();
    res.json({ message: "User created successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Logout
authRouter.get("/user/logout", async (req, res) => {
  res
    .cookie("token", "", { expires: new Date(0) })
    .json({ message: "Logout Successfully !!" });
});

// Forgot Password
authRouter.patch("/user/forgotPassword", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    await validateEditPassword(req);
    const hashPassword = await bcrypt.hash(req.body.newPassword, 10);
    loggedInUser["password"] = hashPassword;
    await loggedInUser.save();
    res.json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = authRouter;
