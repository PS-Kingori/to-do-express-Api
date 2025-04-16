import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
// Connect to MongoDB

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDb;