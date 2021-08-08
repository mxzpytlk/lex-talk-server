import { IContact } from '../../core/data/contact';
import { ResolveFunction } from '../../core/types';
import { checkAuth } from '../../midlewares/check-auth';
import { MessageService } from '../../services/message.service';

type AddContactData = {
  name: string;
};
type AddContactResolve = ResolveFunction<AddContactData, IContact>;

export const addContact: AddContactResolve = async (_parent, { name }, { req }) => {
  const user = checkAuth(req);
  return MessageService.addContact(user.id, name);
};
