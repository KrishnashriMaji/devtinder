const express = require("express");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    const data = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
      // }).populate("fromUserId", ["firstName", "lastName"]);
    }).populate("fromUserId", "firstName lastName age gender skill about");

    res.json({
      message: "Data fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    const data = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName age gender skill about")
      .populate("toUserId", "firstName lastName age gender skill about");

    const onlySenderdetails = data.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.json({
      message: "Data fetched successfully",
      data: onlySenderdetails,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all users
userRouter.get("/user/feed", userAuth, async (req, res) => {
  const pageNo = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 3;
  limit = limit > 50 ? 50 : limit;

  const skip = (pageNo - 1) * limit;

  const loggedInUser = req.user;
  try {
    const connections = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    })
      .select("fromUserId toUserId")
      .sort({
        _id: "desc",
      });

    const hideUserFromFeed = new Set();

    connections.map((row) => {
      hideUserFromFeed.add(row.fromUserId.toString());
      hideUserFromFeed.add(row.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } }, // not in this array
        { _id: { $ne: loggedInUser._id } }, // not equal to user
      ],
    })
      .select("firstName lastName age gender skill about")
      .skip(skip)
      .limit(limit);

    if (users.length !== 0) {
      res.json({ data: users });
    } else {
      res.json({ message: "No user available." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
