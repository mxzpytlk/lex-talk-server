import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { GraphQLUpload } from 'graphql-upload';
import { checkAuth } from '../../midlewares/check-auth';
import { ApiError } from '../../core/exceptions/api.error';
import { UserService } from '../../services/user.service';
import { UserType } from '../types/user.type';

export const updateUser: GraphQLFieldConfig<null, IConnection> = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    about: { type: GraphQLString },
    avatar: { type: GraphQLUpload },
  },
  async resolve(_parent, data, { req }) {
    const user = checkAuth(req);

    if (!(user.name && user.about)) {
      if (!(data.name && data.about && data.avatar)) {
        throw ApiError.BadRequest('Not all fields fullfiled');
      }
    }

    return await UserService.updateInfo(user.id, data);
  },
};
