const express = require("express");

const app = express(); // created a instance

// app.use("/user", (req, res) => {
//   res.send("HAHAHAHAHAHAHA");
// });

app.get("/u{s}*er", (req, res) => {
  res.send({ firstname: "krishnashri", lastname: "maji" });
});

app.post("/user", (req, res) => {
  console.log(req.query.userId);
  res.send("User has been created.");
});

app.post("/user/:userId", (req, res) => {
  console.log(req.params.userId);
  res.send("User has been created.");
});

app.delete("/user", (req, res) => {
  res.send("User has been deleted.");
});

app.use("/test/2", (req, res) => {
  res.send("Namste test2 !!!");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server test !!!");
});

// listen to a port for incoming requests
app.listen(3000, () => {
  console.log("server is successfully listning on port 3000.");
});
