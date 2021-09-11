import { pubsub } from './pubsub';
import { SubscriptionTypes } from './subscription-types';
import { withFilter } from 'graphql-subscriptions';

export const messageSent = {
  subscribe: withFilter(
    (): AsyncIterator<unknown> => {
      return pubsub.asyncIterator([SubscriptionTypes.MESSAGE_SENT]);
    },
    (payload, variables) => {
      return true;
    }
  ),
};
