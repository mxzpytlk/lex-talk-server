import { Schema, model, Types } from 'mongoose';

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
  name: { type: String, unique: true, },
  about: { type: String },
  avatar: { type: Types.ObjectId, ref: 'File' },
});

export const UserModel = model('User', schema);
