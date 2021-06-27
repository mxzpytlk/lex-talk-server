import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { login } from './queries/login.query';
import { register } from './mutations/register.mutation';
import { logout } from './mutations/logout.mutation';
import { refresh } from './mutations/refresh.mutation';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    login
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register, logout, refresh
  },
});

export const queryGraphQl = new GraphQLSchema({
  query,
  mutation,
});
