const express = require("express");

const app = express(); // created a instance

// parameters -> route,request handler
app.use("/test", (req, res) => {
  res.send("Hello from the server !!!");
});

// listen to a port for incoming requests
app.listen(3000, () => {
  console.log("server is successfully listning on port 3000.");
});
