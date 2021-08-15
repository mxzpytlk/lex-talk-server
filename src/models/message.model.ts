import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  dateTime: {
    type: String,
    required: true,
  },
  text: String,
  file: {
    type: Types.ObjectId,
    ref: 'File',
  },
  sender: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const MessageModel = model('Message', schema);
