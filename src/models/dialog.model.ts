import { Schema, model, Types } from 'mongoose';
import { IDialogInDB } from '../core/data/dialog';

const schema = new Schema({
  readMessageCount: {
    type: Number,
    default: 0,
  },
  messages: { type: [Types.ObjectId], ref: 'Message', required: true },
});

export const DialogModel = model<IDialogInDB>('Dialog', schema);
