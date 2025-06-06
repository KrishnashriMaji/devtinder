const validator = require("validator");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, age } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not correct formated.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not correct formatted.");
  }
};

const validateEditProfileData = (req) => {
  const data = req.body;
  const updateAllowed = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "skill",
    "about",
  ];
  const isUpdateAllowed = Object.keys(data).every((key) =>
    updateAllowed.includes(key)
  );

  if (!isUpdateAllowed) {
    throw new Error("Update is not allowed");
  }

  return isUpdateAllowed;
};

const validateEditPassword = async (req, res) => {
  const loggedInUser = req.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const matchOldPassword = await loggedInUser.validatePassword(oldPassword);

  if (!matchOldPassword) {
    throw new Error("Current password does not match.");
  }

  const matchNewPassword = newPassword === confirmPassword;
  if (!matchNewPassword) {
    throw new Error("New password & confirm password do not match.");
  } else {
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("New password is not strong enough.");
    }
  }
};

const validateSendRequest = async (toUserId, fromUserId, status) => {
  const allowedStatus = ["interested", "ignored"];
  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid status");
  }
  const existingUser = await User.findById(toUserId);

  if (!existingUser) {
    throw new Error("User is not valid");
  }

  const existingConnection = await ConnectionRequest.findOne({
    $or: [
      { toUserId, fromUserId },
      { toUserId: fromUserId, fromUserId: toUserId },
    ],
  });
  if (existingConnection) {
    throw new Error("Connection is already exist");
  }
};

const validateReceiveRequest = async (req) => {
  const requestId = req.params.requestId;
  const loggedInUserId = req.user._id;
  const status = req.params.status;

  const allowedStatus = ["accepted", "rejected"];

  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid status");
  }
  const connectionRequest = await ConnectionRequest.findOne({
    _id: requestId,
    toUserId: loggedInUserId,
    status: "interested",
  });

  if (!connectionRequest) {
    throw new Error("Connection is not exist");
  }

  return connectionRequest;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateEditPassword,
  validateReceiveRequest,
  validateSendRequest,
};
