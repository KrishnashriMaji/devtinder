const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).send("Token invalid !!");
    }
    const decodedObj = await jwt.verify(token, process.env?.JWT_SECRECT_KEY);
    const { _id } = decodedObj;
    const user = await User.findOne({ _id: _id });
    if (!user) {
      throw new Error("user not found !!");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
  }
};

module.exports = {
  userAuth,
};
