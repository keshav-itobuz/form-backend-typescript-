import mongoose from "mongoose";

export default async function dbConnection() {
  try {
    await mongoose.connect(process.env.URL ?? "");
    console.log("Connected to MongoDB");
  }
  catch (error) {
    console.error("MongoDB connection error:", error);
    mongoose.connection.close();
    process.exit(1);
  }
}

