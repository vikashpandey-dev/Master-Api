import { IUser } from '@/interfaces/IUser';
import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    participent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
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
// MessaheSchema.pre('save',function(next){
//     if(this.isNew){
//         this.constructor.find({}).then(result=>{
//             this.id=result.length+1
//             next()
//         })
//     }
// })
export default mongoose.model<IUser & mongoose.Document>('conversation', conversationSchema);
