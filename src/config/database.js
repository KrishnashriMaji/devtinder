const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env?.MONGO_DB_CONNECTION_URL);
};

module.exports = connectDB;
