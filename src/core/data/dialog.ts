import { MDocument } from '../types';

export interface IDialogInDB {
  unreadMessages: number;
  messages: MDocument<string>[];
}
