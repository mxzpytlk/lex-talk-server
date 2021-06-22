import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from "graphql";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    isActivated: { type: GraphQLBoolean },
  }),
});
