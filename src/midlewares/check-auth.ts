import { AuthenticationError } from 'apollo-server-express';
import { Request } from 'express';
import { IUser } from '../core/data/user';
import { ErrorService } from '../core/exceptions/api.error';
import { TokenService } from '../services/token.service';

export function checkAuth(req: Request): IUser {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AuthenticationError('User is unauthorised');
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw ErrorService.UnauthorisedError();
    }
    const userData = TokenService.validateAccessToken<IUser>(accessToken);
    if (!userData) {
      throw ErrorService.UnauthorisedError();
    }
    return userData;
  } catch (_) {
    throw ErrorService.UnauthorisedError();
  }
}
