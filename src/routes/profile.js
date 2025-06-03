const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validate");

// Read a user
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.json({ data: req.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.json({ message: "User created successfully.", data: updatedData });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.status(400).json({ message: error.message });
  }
});

// Delete
profileRouter.delete("/user/delete/:userId", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params?.userId);
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = profileRouter;
