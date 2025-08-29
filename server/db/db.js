import mongoose from "mongoose";

export const connectDB= async()=>{
    try {
        const instance= await mongoose.connect(process.env.MONGO_DB_URL)
        console.log('mongo db connected at', instance.connections[0].host);
        
    } catch (error) {
        console.log(error);
        
    }
}