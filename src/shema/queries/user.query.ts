import { GraphQLFieldConfig, GraphQLID } from 'graphql';
import { UserModel } from '../../models/user.model';
import { UserType } from '../types/user.type';

export const getUser: GraphQLFieldConfig<null, string> = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve(_parent, { id }) {
    return UserModel.findById(id);
  },
};
