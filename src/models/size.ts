import { IUser } from '@/interfaces/IUser';
import { timeStamp } from 'console';
import mongoose from 'mongoose';

const SizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
    },
    sizedetail: {
      type: String,
    },
    isstock:{
      type:Boolean,default:false
    },
    qty:{
      type:Number
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
// SizeSchema.pre('save',function(next){
//     if(this.isNew){
//         this.constructor.find({}).then(result=>{
//             this.id=result.length+1
//             next()
//         })
//     }
// })
export default mongoose.model<IUser & mongoose.Document>('size', SizeSchema);
