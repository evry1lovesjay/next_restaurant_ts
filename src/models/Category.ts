import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
  },
    desc: {
      type: String,
      required: true
  },
    color: {
      type: String,
      required: true
  },
    img: {
      type: String,
      required: true
  },
    slug: { 
      type: String, 
      unique: true 
    },
  },
  { timestamps: true }
  );


//If the Category collection does not exist create a new one.
export default mongoose.models.Category || mongoose.model("Category", categorySchema);
