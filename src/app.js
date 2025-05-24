const express = require("express");

const app = express(); // created a instance

const { authAdmin, userAdmin } = require("./middleware/auth");

app.use("/admin", (req, res, next) => {
  try {
    throw new error("xyz");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Centralized error
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong !!!");
  }
});

// listen to a port for incoming requests
app.listen(3000, () => {
  console.log("server is successfully listning on port 3000.");
});
