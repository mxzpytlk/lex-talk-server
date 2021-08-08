import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { IAuthSuccess, IRegister } from '../../core/data/register';
import { CookieKey } from '../../core/enums/cookie-key';
import { ResolveFunction } from '../../core/types';
import { daysToMilisecond } from '../../core/utils/date.utils';
import { UserService } from '../../services/user.service';

type LoginResolve = ResolveFunction<IRegister, IAuthSuccess>;

export const login: LoginResolve = async (_parent, { email, password }, { res }) => {
  const data = await UserService.login(email, password);
  res.cookie(CookieKey.REFRESH_TOKEN, data.jwt.refreshToken, {
    maxAge: daysToMilisecond(30),
    httpOnly: true,
  });

  return data;
};
