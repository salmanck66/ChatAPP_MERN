import mongoose from "mongoose";

const connecttomdbserver = async () => {
  try {
    if (!process.env.MONGO_CONNECTION) {
      throw new Error('MongoDB connection string (MONGO_CONNECTION) is missing');
    }

    await mongoose.connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("db connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connecttomdbserver;
