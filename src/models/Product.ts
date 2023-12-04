import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    img:{
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    isFeatured: { 
        type: Boolean, 
        default: false 
    },
    options: [
            {
                title:{ type:String, required:false },
                additionalPrice:{ type:Number, required:false }
            }
        ], // Store JSON data as Mixed type
    category: { 
        type:{
        categoryId:{ type:String, required:true },
        categoryTitle:{ type:String, required:true }
        }
    }},
    {timestamps:true}
  );
  
 //If the Product collection does not exist create a new one.
export default mongoose.models.Product || mongoose.model("Product", productSchema);
