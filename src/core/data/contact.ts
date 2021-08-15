import { MDocument } from '../types';
import { IUser } from './user';
import { UserModel } from '../../models/user.model';
import { DialogModel } from '../../models/dialog.model';
import { IDialogInDB } from './dialog';
import { MessageModel } from '../../models/message.model';
import { IMessageInDb } from './message';

export interface IContact {
  id: string;
  name: string;
  about: string;
  avatar: string;
  lastMessage?: string;
}

export interface IContactDB {
  _id: string;
  user: string;
  dialog?: string;
}

export class ContactData implements IContact {
  constructor(private contact: IContact) {}

  public get id(): string {
    return this.contact.id;
  }

  public get name(): string {
    return this.contact.name;
  }

  public get about(): string {
    return this.contact.about;
  }

  public get avatar(): string {
    return this.contact.avatar;
  }

  public get lastMessage(): string {
    return this.contact.lastMessage;
  }

  public static async create(contactInDb: MDocument<IContactDB> | IContactDB): Promise<ContactData> {
    const user: MDocument<IUser> = await UserModel.findById(contactInDb.user);
    const dialogId = contactInDb.dialog;
    let lastMessage: string;
    if (dialogId) {
      const dialog: MDocument<IDialogInDB> = await DialogModel.findById(contactInDb.dialog);
      const lastMessageId = dialog.messages.pop();
      if (lastMessageId) {
        const lastMessageInDb: MDocument<IMessageInDb> = await MessageModel.findById(lastMessageId);
        lastMessage = (lastMessageInDb.text || lastMessageInDb.file._id).toString();
      }
    }

    const { name, about, avatar } = user;
    const contact: IContact = { id: contactInDb._id, name, about, avatar, lastMessage };
    return new ContactData(contact);
  }
}
