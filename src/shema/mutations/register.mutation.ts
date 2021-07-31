import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { daysToMilisecond } from '../../core/utils/date.utils';
import { ApiError } from '../../core/exceptions/api.error';
import { UserService } from '../../services/user.service';
import { RegisterType } from '../types/register.type';
import { CookieKey } from '../../core/enums/cookie-key';

export const register: GraphQLFieldConfig<null, IConnection> = {
  type: RegisterType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_parent, { email, password }, { res }) {
    if (password?.length < 6) {
      throw ApiError.BadRequest('Password can not be less than 6');
    }
    const data = await UserService.register(email, password);
    res.cookie(CookieKey.REFRESH_TOKEN, data.jwt.refreshToken, {
      maxAge: daysToMilisecond(30),
      httpOnly: true,
    });
    return data;
  },
};
