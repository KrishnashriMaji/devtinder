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
      res.send("Login Successfully !!");
    } else {
      throw new Error("Invalid Credential!!");
    }
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
  }
});

// Insert
authRouter.post("/user/signup", async (req, res) => {
  try {
    // validate data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password, age, gender } = req.body;

    // Encript the data
    // bcrypt.hash(password, 10).then(function (hash) {
    //   console.log(hash);
    // });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: hashPassword,
      age: age,
      gender: gender,
    });
    await user.save();
    res.send("User created successfully.");
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
  }
});

// Logout
authRouter.get("/user/logout", async (req, res) => {
  res
    .cookie("token", "", { expires: new Date(0) })
    .send("Logout Successfully !!");
});

// Forgot Password
authRouter.patch("/user/forgotPassword", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    await validateEditPassword(req);
    const hashPassword = await bcrypt.hash(req.body.newPassword, 10);
    loggedInUser["password"] = hashPassword;
    await loggedInUser.save();
    res.send("Password updated successfully.");
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
  }
});

module.exports = authRouter;
