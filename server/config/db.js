import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB,
            console.log("Database Connected")
        );            
    } catch (error) {
        console.error("Error connecting to the database:", error);        
    }
    // mongoose.connect(process.env.MONGODB,
    //     console.log("Database Connected")
    // );
}



export default connectDB;