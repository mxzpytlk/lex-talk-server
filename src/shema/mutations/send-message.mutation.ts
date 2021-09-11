import { checkAuth } from '../../midlewares/check-auth';
import { ResolveFunction } from '../../core/types';
import { MessageService } from '../../services/message.service';
import { INewMessage } from '../../core/data/message';
import { pubsub } from '../subscriptions/pubsub';
import { SubscriptionTypes } from '../subscriptions/subscription-types';

type SendMessageResolve = ResolveFunction<INewMessage, boolean>;

export const sendMessage: SendMessageResolve = async (_parent, data, { req }) => {
  const user = checkAuth(req);
  const message = await MessageService.sendMessage(user.id, data);

  pubsub.publish(SubscriptionTypes.MESSAGE_SENT, {
    messageSent: message,
  });
  return true;
};
