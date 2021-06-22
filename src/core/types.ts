import * as Mongoose from 'mongoose';

export type MDocument<T> = Mongoose.Document & Partial<T>;
