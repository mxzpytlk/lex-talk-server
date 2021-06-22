import { GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./user.type";

const JwtType = new GraphQLObjectType({
  name: 'Jwt',
  fields: () => ({
    accesToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
  }),
});

export const RegisterType = new GraphQLObjectType({
  name: 'Register',
  fields: () => ({
    user: { type: UserType },
    jwt: { type: JwtType }
  }),
});

