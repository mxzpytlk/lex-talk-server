import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { daysToMilisecond } from '../../core/utils/date.utils';
import { ApiError } from '../../exceptions/api.error';
import { UserService } from '../../services/user.service';
import { RegisterType } from '../types/register.type';

export const addUser: GraphQLFieldConfig<null, IConnection> = {
  type: RegisterType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_parent, { email, password }, { res }) {
    if (!password || password.length < 6) {
      throw ApiError.BadRequest('Password can not be less than 6');
    }
    const data = await UserService.register(email, password);
    res.cookie('refreshToken', data.jwt.refreshToken, {
      maxAge: daysToMilisecond(30),
      httpOnly: true,
    });
    return data;
  },
};
