import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  unreadMessages: {
    type: Number,
    default: 1,
  },
  messages: { type: [Types.ObjectId], ref: 'Message', required: true },
});

export const DialogModel = model('Dialog', schema);
