import { Schema, model } from 'mongoose';

const schema = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActivated: { type: Boolean, default: false },
  activationLink: {
    type: String,
  },
});

export const UserModel = model('User', schema);
