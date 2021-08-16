import { IMessage } from '../../core/data/message';
import { ResolveFunction } from '../../core/types';
import { checkAuth } from '../../midlewares/check-auth';
import { MessageService } from '../../services/message.service';

interface IMessageQueryData {
  contactId: string;
}

type MessagesResolve = ResolveFunction<IMessageQueryData, IMessage[]>;

export const messages: MessagesResolve = async (_parent, { contactId }, { req }) => {
  const user = checkAuth(req);
  return MessageService.getMessages(user.id, contactId);
};
