



// add db

import mongoose from "mongoose";

export const connectDB = async () => {
 // Set the `strictQuery` option before connecting to suppress the deprecation warning
mongoose.set('strictQuery', true); // Use true to enforce strict queries, or false to allow non-schema properties in queries

 const { connection } = await mongoose.connect(process.env.MONGO_URI);
 console.log(`Database is connected with ${connection.host}`);
};