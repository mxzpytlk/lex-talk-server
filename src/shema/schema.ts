import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getUser } from './queries/user.query';
import { addUser } from './mutations/add-user.mutation';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: getUser,
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser,
  },
});

export const queryGraphQl = new GraphQLSchema({
  query,
  mutation,
});
