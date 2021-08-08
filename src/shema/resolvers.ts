import { getConfig } from './queries/config.query';
import { login } from './queries/login.query';
import { refresh } from './queries/refresh.query';
import { addContact } from './mutations/add-contact.mutation';
import { logout } from './mutations/logout.mutation';
import { register } from './mutations/register.mutation';
import { updateConfig } from './mutations/update-config.mutation';
import { updateUser } from './mutations/update-user.mutation';

export const resolvers = {
  Query: {
    getConfig, login, refresh
  },
  Mutation: {
    addContact, logout, register, updateConfig, updateUser
  }
};