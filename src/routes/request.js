const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.get(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    const toUserId = req.params.userId;
    const fromUserId = req.user._id;
    const status = req.params.status;

    try {
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid status");
      }
      console.log(toUserId, fromUserId);

      const existingUser = await User.findById(toUserId);

      if (!existingUser) {
        return res.status(400).send("User is not valid");
      }

      const existingConnection = await ConnectionRequest.findOne({
        $or: [
          { toUserId, fromUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });
      if (existingConnection) {
        return res.status(400).send("Connection is already exist");
      }
      const connectionRequest = new ConnectionRequest({
        toUserId,
        fromUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: `${status} request sent successfully`,
        data,
      });
    } catch (error) {
      res.status(400).send("Somthing wrong - " + error.message);
    }
  }
);

module.exports = requestRouter;
