import { Request } from 'express';
import { IUser } from '../core/data/user';
import { ApiError } from '../core/exceptions/api.error';
import { TokenService } from '../services/token.service';

export function checkAuth(req: Request): IUser {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw ApiError.UnauthorisedError();
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw ApiError.UnauthorisedError();
    }
    const userData = TokenService.validateAccessToken<IUser>(accessToken);
    if (!userData) {
      throw ApiError.UnauthorisedError();
    }
    return userData;
  } catch (_) {
    throw ApiError.UnauthorisedError();
  }
}
