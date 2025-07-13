import mongoose from "mongoose";


const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE;


export const dbConnect = () => {
    mongoose.connect(uri, {dbName})
    .then(() => console.log(`Connected to MongoDB`))
    .catch((err) => console.error('Connection error:', err));
}

