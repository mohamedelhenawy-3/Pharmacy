const mongoose = require("mongoose");

//  wait data from database async
module.exports = connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://MohamedElhenwy:10112000@cluster0.n9msw.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
