const express = require("express");

const app = express(); // created a instance

const { authAdmin, userAdmin } = require("./middleware/auth");

app.use("/admin", authAdmin);

app.get(
  // here auth middleware wouldn't work
  "/user",
  userAdmin, // another way to use middleware function
  (req, res, next) => {
    // middleware
    console.log("2nd Response Log!!");
    next();
  },
  (req, res, next) => {
    // actual request handler
    console.log("3rd Response Log!!");
  }
);

app.get("/admin/getAllData", (req, res) => {
  // first check the auth then comes here
  console.log("admin all data");
});

app.get("/admin/deleteData", (req, res) => {
  console.log("admin data deleted");
});

// listen to a port for incoming requests
app.listen(3000, () => {
  console.log("server is successfully listning on port 3000.");
});
