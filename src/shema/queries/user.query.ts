import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { UserService } from '../../services/user.service';
import { RegisterType } from '../types/register.type';

export const getUser: GraphQLFieldConfig<null, string> = {
  type: RegisterType,
  args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
  async resolve(_parent, { email, password }) {
    return await UserService.login(email, password);
  },
};
