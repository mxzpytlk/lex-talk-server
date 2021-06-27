import { GraphQLFieldConfig } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { daysToMilisecond } from '../../core/utils/date.utils';
import { UserService } from '../../services/user.service';
import { RegisterType } from '../types/register.type';
import { CookieKey } from '../../core/enums/cookie-key';

export const refresh: GraphQLFieldConfig<null, IConnection> = {
  type: RegisterType,
  args: {},
  async resolve(_parent, _, { req, res }) {
    const refreshToken: string = req.cookies[CookieKey.REFRESH_TOKEN];
    const data = await UserService.refresh(refreshToken);
    res.cookie(CookieKey.REFRESH_TOKEN, data.jwt.refreshToken, {
      maxAge: daysToMilisecond(30),
      httpOnly: true,
    });
    return data;
  },
};
