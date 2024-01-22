import { IUser } from '@/interfaces/IUser';
import { timeStamp } from 'console';
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, 'categoryname'],
    },
    categoryimg:{
      type:String
    },
    image: [
      {
        type: String,
      },
    ],
    from:{
      type:String
    },
    type:{
      type:String
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Date, default: Date.now },
  },
  { timestamps: true },
);
// categorySchema.pre('save',function(next){
//     if(this.isNew){
//         this.constructor.find({}).then(result=>{
//             this.id=result.length+1
//             next()
//         })
//     }
// })
export default mongoose.model<IUser & mongoose.Document>('category', categorySchema);
