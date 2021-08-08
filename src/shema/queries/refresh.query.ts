import { daysToMilisecond } from '../../core/utils/date.utils';
import { UserService } from '../../services/user.service';
import { CookieKey } from '../../core/enums/cookie-key';
import { IAuthSuccess } from '../../core/data/register';
import { ResolveFunction } from '../../core/types';

type RefreshResolve = ResolveFunction<null, IAuthSuccess>;

export const refresh: RefreshResolve = async (_parent, _, { req, res }) => {
  const refreshToken: string = req.cookies[CookieKey.REFRESH_TOKEN];
  const data = await UserService.refresh(refreshToken);
  res.cookie(CookieKey.REFRESH_TOKEN, data.jwt.refreshToken, {
    maxAge: daysToMilisecond(30),
    httpOnly: true,
  });
  return data;
};
