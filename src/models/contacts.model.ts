import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

export const ContactModel = model('contact', schema);
