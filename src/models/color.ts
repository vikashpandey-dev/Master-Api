import { IUser } from '@/interfaces/IUser';
import { timeStamp } from 'console';
import mongoose from 'mongoose';
const ColorSchema = new mongoose.Schema(
  {
    color: {
      type: String,
    },
    images:[
      {
        type:String
      }
    ],
    qty:{
      type:Number
    },
    isqty:{
type:Boolean,default:false
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
// ColorSchema.pre('save',function(next){
//     if(this.isNew){
//         this.constructor.find({}).then(result=>{
//             this.id=result.length+1
//             next()
//         })
//     }
// })
export default mongoose.model<IUser & mongoose.Document>('color', ColorSchema);
