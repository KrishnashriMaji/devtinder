const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://enctest021:L2jrIxW9PyDJAUdl@namastenode.3yevtr3.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
