import { MDocument } from '../types';

export interface INewMessage {
  text?: string;
  file?: string;
  contactId: string;
}

export interface IMessageInDb {
  dateTime: string;
  sender: string;
  text?: string;
  file?: MDocument<string>;
}
