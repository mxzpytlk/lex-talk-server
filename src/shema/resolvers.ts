import { getConfig } from './queries/config.query';
import { login } from './queries/login.query';
import { refresh } from './queries/refresh.query';
import { addContact } from './mutations/add-contact.mutation';
import { logout } from './mutations/logout.mutation';
import { register } from './mutations/register.mutation';
import { updateConfig } from './mutations/update-config.mutation';
import { updateUser } from './mutations/update-user.mutation';
import { contacts } from './queries/contacts.query';
import { sendMessage } from './mutations/send-message.mutation';
import { messages } from './queries/messages.query';
import { messageSent } from './subscriptions/message-sent.subscription';
import { IExecutableSchemaDefinition } from '@graphql-tools/schema';

export const resolvers: IExecutableSchemaDefinition['resolvers'] = {
  Query: {
    getConfig,
    login,
    refresh,
    contacts,
    messages,
  },
  Mutation: {
    addContact,
    logout,
    register,
    updateConfig,
    updateUser,
    sendMessage,
  },
  Subscription: {
    messageSent,
  },
};
