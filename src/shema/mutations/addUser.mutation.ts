import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { IRegister } from '../../core/data/register';
import { UserService } from '../../services/user.service';
import { RegisterType } from '../types/register.type';

export const addUser: GraphQLFieldConfig<null, IRegister> = {
  type: RegisterType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_parent, { email, password }) {
    const data = await UserService.register(email, password);
    return data;
  },
}
