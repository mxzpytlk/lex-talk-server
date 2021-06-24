import { GraphQLBoolean, GraphQLFieldConfig } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { CookieKey } from '../../core/enums/cookie-key';
import { UserService } from '../../services/user.service';

export const logout: GraphQLFieldConfig<null, IConnection> = {
  type: GraphQLBoolean,
  async resolve(_parent, _ , { req, res }) {
    const refreshToken = req.cookies.refreshToken;
    await UserService.logaut(refreshToken);
    res.clearCookie(CookieKey.REFRESH_TOKEN);
  }
};
