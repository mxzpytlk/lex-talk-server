import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { login } from './queries/login.query';
import { register } from './mutations/register.mutation';
import { logout } from './mutations/logout.mutation';
import { refresh } from './queries/refresh.query';
import { updateUser } from './mutations/update-user.mutation';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    login, refresh
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register, logout, updateUser
  },
});

export const queryGraphQl = new GraphQLSchema({
  query,
  mutation,
});
