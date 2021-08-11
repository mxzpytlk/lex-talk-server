import { UserModel } from '../models/user.model';
import { ContactModel } from '../models/contacts.model';
import { MDocument } from '../core/types';
import { IUser } from '../core/data/user';
import { ContactData, IContact, IContactDB } from '../core/data/contact';
import { ErrorService } from '../core/exceptions/api.error';

export class MessageService {
  public static async addContact(userId: string, name: string): Promise<IContact> {
    const user: MDocument<IUser> = await UserModel.findById(userId);
    const searchingUser: MDocument<IUser> = await UserModel.findOne({ name });
    if (!searchingUser) {
      throw ErrorService.BadRequest('user.not_exist');
    }
    if (searchingUser.equals(user)) {
      throw ErrorService.BadRequest('user.not_add_yourself');
    }

    const oldContacts = await ContactModel.find({ user: searchingUser._id });

    let contact;
    if (oldContacts?.length > 0) {
      const oldContactId = user.contacts.find((userContact) => oldContacts.some((oldContact) => oldContact.equals(userContact)));
      if (oldContactId) {
        return null;
      }
    }

    if (!contact) {
      contact = new ContactModel({ user: searchingUser._id });
      user.contacts.push(contact._id);
      await contact.save();
      await user.save();
    }
    return {
      id: contact._id,
      name: searchingUser.name,
      about: searchingUser.about,
      avatar: searchingUser.avatar,
    };
  }

  public static async getContacts(userId: string): Promise<IContact[]> {
    const user: MDocument<IUser> = await UserModel.findById(userId);
    const contactsInDb: MDocument<IContactDB>[] = await ContactModel.find({ _id: { $in: user.contacts } });
    const contacts = contactsInDb.map(ContactData.create);

    return Promise.all(contacts);
  }
}
