import { Schema, model } from 'mongoose';

const schema = new Schema({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  }
});

export const FileModel = model('File', schema);
