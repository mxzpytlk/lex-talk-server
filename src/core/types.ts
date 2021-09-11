import * as Mongoose from 'mongoose';
import { IConnection } from './data/connection';

export type MDocument<T> = Mongoose.Document & Partial<T>;
export type ResolveFunction<T, V> = (_parent: null, data: T, context: IConnection) => Promise<V>;
export type SubscriptionConnectionParams = {
  authorization: string;
};
