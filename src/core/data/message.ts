export interface INewMessage {
  text?: string;
  file?: string;
  contactId: string;
}

export interface IMessageInDb {
  dateTime: string;
  sender: string;
  text?: string;
  file?: string;
}
