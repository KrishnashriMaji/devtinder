const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validate");

// Read a user
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Something wrong !!!!" + err.message);
  }
});

// Read all users
profileRouter.get("/user/feed", async (req, res) => {
  try {
    const users = await User.find().sort({
      _id: "desc",
    });
    if (users.length !== 0) {
      res.send(users);
    } else {
      res.send("No user available.");
    }
  } catch (err) {
    res.status(400).send("Something wrong !!!!");
  }
});

// Update with params
profileRouter.patch("/profile/edit/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const { firstName, lastName, location, age, gender, skill } = req.body;

  const filter = { _id: userId };
  const data = req.body;

  try {
    const updateAllowed = [
      "firstName",
      "lastName",
      "password",
      "age",
      "skill",
      "about",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      updateAllowed.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }

    const updatedData = await User.findOneAndUpdate(
      filter,
      {
        firstName: firstName,
        lastName: lastName,
        location: location,
        age: age,
        gender: gender,
        skill: skill,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    res.send("User created successfully." + updatedData);
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
  }
});

// alternative profile update with cookie

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    validateEditProfileData(req);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: "Profile data has been updated successfully.",
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
  }
});

// Delete
profileRouter.delete("/user/delete/:userId", async (req, res) => {
  console.log(req.params?.userId);

  try {
    await User.findByIdAndDelete(req.params?.userId);
    res.send("User deleted successfully.");
  } catch (error) {
    res.status(400).send("Something wrong !!!!");
  }
});

module.exports = profileRouter;
