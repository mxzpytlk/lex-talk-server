import { IContact } from '../../core/data/contact';
import { ResolveFunction } from '../../core/types';
import { checkAuth } from '../../midlewares/check-auth';
import { MessageService } from '../../services/message.service';

type LoginResolve = ResolveFunction<null, IContact[]>;

export const contacts: LoginResolve = async (_parent, _, { req }) => {
  const user = checkAuth(req);
  return MessageService.getContacts(user.id);
};
