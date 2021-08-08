import { daysToMilisecond } from '../../core/utils/date.utils';
import { ErrorService } from '../../core/exceptions/api.error';
import { UserService } from '../../services/user.service';
import { CookieKey } from '../../core/enums/cookie-key';
import { ResolveFunction } from '../../core/types';
import { IAuthSuccess, IRegister } from '../../core/data/register';

type RegisterResolve = ResolveFunction<IRegister, IAuthSuccess>;

export const register: RegisterResolve = async (_parent, { email, password }, { res }) => {
  if (password?.length < 6) {
    throw ErrorService.BadRequest('Password can not be less than 6');
  }

  const data = await UserService.register(email, password);
  res.cookie(CookieKey.REFRESH_TOKEN, data.jwt.refreshToken, {
    maxAge: daysToMilisecond(30),
    httpOnly: true,
  });
  return data;
};
