import { CookieKey } from '../../core/enums/cookie-key';
import { ResolveFunction } from '../../core/types';
import { UserService } from '../../services/user.service';

type LogoutResolve = ResolveFunction<null, boolean>;

export const logout: LogoutResolve = async (_parent, _, { req, res }) => {
  const refreshToken = req.cookies.refreshToken;
  await UserService.logaut(refreshToken);
  res.clearCookie(CookieKey.REFRESH_TOKEN);
  return true;
};
