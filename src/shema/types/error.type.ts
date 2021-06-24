import {  GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const ErrorType = new GraphQLObjectType({
  name: 'e',
  fields:  () => ({
    message: { type: GraphQLString },
    status: { type: GraphQLInt }
  }),
});

