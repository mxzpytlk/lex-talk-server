import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { login } from './queries/login.query';
import { register } from './mutations/register.mutation';
import { logout } from './mutations/logout.mutation';
import { refresh } from './queries/refresh.query';
import { updateUser } from './mutations/update-user.mutation';
import { updateConfig } from './mutations/update-config.mutation';
import { getConfig } from './queries/config.query';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    login, refresh, getConfig
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register, logout, updateUser, updateConfig
  },
});

export const queryGraphQl = new GraphQLSchema({
  query,
  mutation,
});
