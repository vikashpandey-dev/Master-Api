import { IUser } from '@/interfaces/IUser';
import { timeStamp } from 'console';
import mongoose from 'mongoose';
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    images: {
      type: String,
    },
    description: {
      type: String,
    },
    reason:{
      type: String,
    },
    status: {
    
      type: String,  
      enum: ["Pending", "Accept", "Rejected"],  
      default: "Pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now },
    createdBy: {  
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
  },
});

export default mongoose.model<IUser & mongoose.Document>('Blog', BlogSchema);
