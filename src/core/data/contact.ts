import { MDocument } from '../types';
import { IUser } from './user';
import { UserModel } from '../../models/user.model';

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

  lastMessage?: string;

  public static async create(contactInDb: MDocument<IContactDB> | IContactDB): Promise<ContactData> {
    const user: MDocument<IUser> = await UserModel.findById(contactInDb.user);
    const { name, about, avatar } = user;
    const contact: IContact = { id: contactInDb._id, name, about, avatar };
    return new ContactData(contact);
  }
}
