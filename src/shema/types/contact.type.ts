import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const ContactType = new GraphQLObjectType({
  name: 'Contact',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    about: { type: GraphQLString },
    avatar: { type: GraphQLString },
    lastMessage: { type: GraphQLString }
  }),
});
