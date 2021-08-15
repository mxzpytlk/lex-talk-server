import { checkAuth } from '../../midlewares/check-auth';
import { ResolveFunction } from '../../core/types';
import { MessageService } from '../../services/message.service';
import { INewMessage } from '../../core/data/message';

type SendMessageResolve = ResolveFunction<INewMessage, boolean>;

export const sendMessage: SendMessageResolve = async (_parent, data, { req }) => {
  const user = checkAuth(req);
  await MessageService.sendMessage(user.id, data);
  return true;
};
