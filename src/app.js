const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use("/", express.json());

// Insert
app.post("/signupUser", async (req, res) => {
  const { firstName, lastName, location, age, gender } = req.body;

  const user = await new User({
    firstName: firstName,
    lastName: lastName,
    location: location,
    age: age,
    gender: gender,
  });

  try {
    user.save();
    res.send("User created successfully.");
  } catch (error) {
    res.status(400).send("Something wrong !!!!");
  }
});

// Read a user
app.get("/getUser", async (req, res) => {
  const _firstName = req.body.firstName;
  try {
    const user = await User.findOne({ firstName: _firstName }).sort({
      _id: "desc",
    });
    if (user) {
      res.send(user);
    } else {
      res.send("No user available.");
    }
  } catch (err) {
    res.status(400).send("Something wrong !!!!" + err.message);
  }
});

// Read all users
app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find().sort({
      _id: "desc",
    });
    if (users.length !== 0) {
      res.send(users);
    } else {
      res.send("No user available.");
    }
  } catch (err) {
    res.status(400).send("Something wrong !!!!");
  }
});

// Update
app.patch("/updateUser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  console.log(userId);
  const { firstName, lastName, location, age, gender, Customer } = req.body;

  const filter = { _id: userId };

  try {
    const updatedData = await User.findOneAndUpdate(
      filter,
      {
        firstName: firstName,
        lastName: lastName,
        location: location,
        age: age,
        gender: gender,
        type: Customer,
      },
      {
        returnDocument: "after",
      }
    );
    res.send("User created successfully." + updatedData);
  } catch (error) {
    res.status(400).send("Something wrong !!!!");
  }
});

// Delete
app.delete("/deleteUser/:userId", async (req, res) => {
  console.log(req.params?.userId);

  try {
    await User.findByIdAndDelete(req.params?.userId);
    res.send("User deleted successfully.");
  } catch (error) {
    res.status(400).send("Something wrong !!!!");
  }
});

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
