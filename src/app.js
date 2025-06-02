const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(cookieParser());
app.use("/", express.json());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.error("Database connection is establised.");

    app.listen(3000, () => {
      console.log("server is successfully listning on port 3000.");
    });
  })
  .catch((err) => {
    console.error("Database is not connected");
  });
