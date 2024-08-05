import mongoose from "mongoose";

const connecttomdbserver = async ()=>
{
    try {
        mongoose.connect(process.env.MONGO_CONNECTION)
        console.log("db connected")
    } catch (error) {
        
    }
}

export default connecttomdbserver