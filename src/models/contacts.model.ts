import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  dialog: {
    type: Types.ObjectId,
    ref: 'Dialog',
  },
});

export const ContactModel = model('Contact', schema);
