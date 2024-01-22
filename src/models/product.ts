import { IUser } from '@/interfaces/IUser';
import { timeStamp } from 'console';
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    brandname: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    images: [
      {
        type: String,
      },
    ],

    sizename: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size',
      },
    ],
    colorname: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'color',
      },
    ],
    categoryid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
    off: {
      type: String,
    },

    discound: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    totalrating: {
      type: String,
    },
    review: {
      type: String,
    },
    availableoffer: [
      {
        type: String,
      },
    ],
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now },
    createdBy: [
      {
        type: Date,
        default: Date.now,
      },
      {
        user: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);
// ProductSchema.pre('save',function(next){
//     if(this.isNew){
//         this.constructor.find({}).then(result=>{
//             this.id=result.length+1
//             next()
//         })
//     }
// })
export default mongoose.model<IUser & mongoose.Document>('product', ProductSchema);
