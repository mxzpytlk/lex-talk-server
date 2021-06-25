import jwt from 'jsonwebtoken';
import config from '../assets/config.json';
import { IJwt } from '../core/data/jwt';
import { IUser } from '../core/data/user';
import { MDocument } from '../core/types';
import TokenModel, { IToken } from '../models/token.model';

export class TokenService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static generateToken(payload: string | object | Buffer): IJwt {
    const accesToken = jwt.sign(payload, config.jwtSecretAcces, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, config.jwtSecretRefresh, { expiresIn: '30d' });
    return { accesToken, refreshToken };
  }

  public static async saveToken(userId: string, refreshToken: string): Promise<MDocument<IToken>> {
    const tokenData: MDocument<IToken> = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = new TokenModel({ refreshToken, user: userId });
    await token.save();
    return token;
  }

  public static async removeToken(refreshToken: string): Promise<void> {
    await TokenModel.deleteOne({ refreshToken });
  }

  public static async findToken(refreshToken: string): Promise<MDocument<IToken>> {
    return await TokenModel.findOne({ refreshToken });
  }

  public static validateAccessToken<T>(token: string): T {
    try {
      const userData = jwt.verify(token, config.jwtSecretAcces);
      return userData as T;
    } catch(_) {
      return null;
    }
  }

  public static validateRefreshToken<T>(token: string): T {
    try {
      const userData = jwt.verify(token, config.jwtSecretRefresh);
      return (userData as T);
    } catch(_) {
      return null;
    }
  }
}
