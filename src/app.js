const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");
app.use("/", express.json());

// Login
app.get("/loginUser", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ emailId: email });
    if (!user) {
      throw new Error("Invalid Credential!!");
    }
    console.log(password, user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credential!!");
    }

    res.send("Login Successfully !!");
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
  }
});

// Insert
app.post("/signupUser", async (req, res) => {
  try {
    // validate data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password, age, gender } = req.body;

    // Encript the data
    // bcrypt.hash(password, 10).then(function (hash) {
    //   console.log(hash);
    // });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: hashPassword,
      age: age,
      gender: gender,
    });
    await user.save();
    res.send("User created successfully.");
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
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
  const { firstName, lastName, location, age, gender, skill } = req.body;

  const filter = { _id: userId };
  const data = req.body;

  try {
    const updateAllowed = [
      "firstName",
      "lastName",
      "password",
      "age",
      "skill",
      "about",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      updateAllowed.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }

    const updatedData = await User.findOneAndUpdate(
      filter,
      {
        firstName: firstName,
        lastName: lastName,
        location: location,
        age: age,
        gender: gender,
        skill: skill,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    res.send("User created successfully." + updatedData);
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
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
