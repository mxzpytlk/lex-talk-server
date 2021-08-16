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

enum MessageType {
  IMAGE = 'image',
  TEXT = 'text',
}

export interface IMessage {
  dateTime: string;
  text?: string;
  file?: string;
  messageType: MessageType;
  sender: string;
}

export class MessageData implements IMessage {
  constructor(private message: IMessageInDb) {}

  public get dateTime(): string {
    return this.message.dateTime;
  }

  public get text(): string {
    return this.message.text;
  }

  public get file(): string {
    return this.message.file;
  }

  public get sender(): string {
    return this.message.sender;
  }

  public get messageType(): MessageType {
    if (this.text) {
      return MessageType.TEXT;
    } else if (this.file) {
      return MessageType.IMAGE;
    }
  }
}
