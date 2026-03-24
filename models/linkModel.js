import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['whatsapp', 'download', 'getLink'],
    required: true
  },
  url: String
}, { timestamps: true });

export default mongoose.model('Link', linkSchema);