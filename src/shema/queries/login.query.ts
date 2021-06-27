import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { CookieKey } from '../../core/enums/cookie-key';
import { daysToMilisecond } from '../../core/utils/date.utils';
import { UserService } from '../../services/user.service';
import { RegisterType } from '../types/register.type';

export const login: GraphQLFieldConfig<null, IConnection> = {
  type: RegisterType,
  args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
  async resolve(_parent, { email, password }, { res, req }) {
    const data = await UserService.login(email, password);
    res.cookie(CookieKey.REFRESH_TOKEN, data.jwt.refreshToken, {
      maxAge: daysToMilisecond(30),
      httpOnly: true,
    });

    return data;
  },
};
