import { UserModel } from '../models/user.model';
import { ContactModel } from '../models/contacts.model';
import { MDocument } from '../core/types';
import { IUser } from '../core/data/user';
import { ContactData, IContact, IContactDB } from '../core/data/contact';
import { ErrorService } from '../core/exceptions/api.error';
import { INewMessage } from '../core/data/message';
import { DialogModel } from '../models/dialog.model';
import { IDialogInDB } from '../core/data/dialog';
import { MessageModel } from '../models/message.model';

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
    return MessageService.getUserContacts(user);
  }

  public static async sendMessage(userId: string, { text, contactId, file }: INewMessage): Promise<void> {
    const user: MDocument<IUser> = await UserModel.findById(userId);
    const userContact: MDocument<IContactDB> = await ContactModel.findById(contactId);
    const companion: MDocument<IUser> = await UserModel.findById(userContact.user);
    let companionContact = await MessageService.getUserContact(companion, user);
    if (!companionContact) {
      companionContact = new ContactModel({ user: user._id });
      companion.contacts.push(companionContact._id);
      await companionContact.save();
      await companion.save();
    }
    if (!userContact.dialog || !companionContact.dialog) {
      const dialog = new DialogModel();
      userContact.dialog = dialog._id;
      companionContact.dialog = dialog._id;
      await dialog.save();
      await userContact.save();
      await companionContact.save();
    }
    const dialog: MDocument<IDialogInDB> = await DialogModel.findById(userContact.dialog);
    const dateTime = new Date().toISOString();
    const message = new MessageModel({ text, file, dateTime, sender: userId });
    dialog.messages.push(message.id);
    await dialog.save();
    await message.save();
  }

  private static async getUserContacts(user: MDocument<IUser>): Promise<IContact[]> {
    const contactsInDb = await MessageService.getUserContactsFromDB(user);
    const contacts = contactsInDb.map(ContactData.create);
    return Promise.all(contacts);
  }

  private static async getUserContact(user: MDocument<IUser>, companion: MDocument<IUser>): Promise<MDocument<IContactDB>> {
    const allUserContacts = await MessageService.getUserContactsFromDB(user);
    return allUserContacts.find((contact) => companion._id.equals(contact.user));
  }

  private static async getUserContactsFromDB(user: MDocument<IUser>): Promise<MDocument<IContactDB>[]> {
    return ContactModel.find({ _id: { $in: user.contacts } });
  }
}
