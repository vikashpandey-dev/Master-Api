import { IUser } from '@/interfaces/IUser';
import { timeStamp } from 'console';
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    conversationId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conversation',
    },
    senderid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    message:{
      type: String,
    },
    receiver:{
      type: String,
    },
    sender:{
      type: String,

    },
    receiverid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
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
// MessaheSchema.pre('save',function(next){
//     if(this.isNew){
//         this.constructor.find({}).then(result=>{
//             this.id=result.length+1
//             next()
//         })
//     }
// })
export default mongoose.model<IUser & mongoose.Document>('message', messageSchema);
