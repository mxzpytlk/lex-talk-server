import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  refreshToken: { type: String, required: true },
  user: { type: Types.ObjectId, ref: 'User' },
});

export interface IToken {
  refreshToken: string,
  user: any
}

export default model('Tocken', schema);
