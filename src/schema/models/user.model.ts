import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
  },
  pass: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('User', schema);
