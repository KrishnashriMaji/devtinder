const validator = require("validator");

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
    "password",
    "age",
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

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateEditPassword,
};
