import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['whatsapp', 'whatsapp2', 'whatsapp3','download', 'getLink'],
    required: true,
    unique: true   
  },
  url: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Link = mongoose.model("Link", linkSchema);
export default Link;