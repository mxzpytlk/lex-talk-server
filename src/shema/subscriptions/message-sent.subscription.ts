import { pubsub } from './pubsub';
import { SubscriptionTypes } from './subscription-types';
import { withFilter } from 'graphql-subscriptions';
import { IUser } from '../../core/data/user';
import { IMessage } from '../../core/data/message';

type MessageSentPayload = {
  messageSent: IMessage;
  recieverId: string;
};

export const messageSent = {
  subscribe: withFilter(
    (): AsyncIterator<unknown> => {
      return pubsub.asyncIterator([SubscriptionTypes.MESSAGE_SENT]);
    },
    (payload: MessageSentPayload, _variables, user: IUser) => payload.recieverId === user.id
  ),
};
