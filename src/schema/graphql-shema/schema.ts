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

const query = new GraphQLObjectType({
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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_parent, { email, password }) {
        const user = new UserMongoSchema({
          email, password
        });
        user.save();
      },
    }
  }
});

export const queryGraphQl = new GraphQLSchema({
  query, mutation
});
