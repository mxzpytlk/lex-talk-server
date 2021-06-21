import { GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import UserMongoSchema from '../models/user.model';


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, { id }) {
        return UserMongoSchema.findById(id);
      },
    },
  },
});

export const queryGraphQl = new GraphQLSchema({
  query: Query
});
