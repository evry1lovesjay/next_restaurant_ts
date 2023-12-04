import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    products: [
        {
            title:{
                type:String,
                required: true,
            },
        }
    ], // Store JSON data as Mixed type
    status: {
        type: String,
        required: true
    },
    intent_id: { 
        type: String, 
        unique: true 
    },
    userEmail:{
        type: String,
        required: true
    }
  },
  { timestamps: true }
  );

  //If the Order collection does not exist create a new one.
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
