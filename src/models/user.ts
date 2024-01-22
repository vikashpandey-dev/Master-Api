import { IUser } from '@/interfaces/IUser';
import { timeStamp } from 'console';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    image:{
      type:String
    },
    salt: String,
    role: {
      type: String,
      default: 'user',
    },
    passwords: {
      type: String,
    },
    token: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
