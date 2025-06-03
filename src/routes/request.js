const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const {
  validateSendRequest,
  validateReceiveRequest,
} = require("../utils/validate");

requestRouter.patch(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    const toUserId = req.params.userId;
    const fromUserId = req.user._id;
    const status = req.params.status;

    try {
      await validateSendRequest(toUserId, fromUserId, status);
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
      res.status(400).json({ message: error.message });
    }
  }
);

requestRouter.patch(
  "/request/receive/:status/:requestId",
  userAuth,
  async (req, res) => {
    const status = req.params.status;
    try {
      const connectionRequest = await validateReceiveRequest(req);

      connectionRequest.status = status;

      const data = await connectionRequest.save();
      res.json({
        message: `Connection request ${status}`,
        data,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = requestRouter;
