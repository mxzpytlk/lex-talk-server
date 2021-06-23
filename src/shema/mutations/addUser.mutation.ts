import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { daysToMilisecond } from '../../core/utils/date.utils';
import { UserService } from '../../services/user.service';
import { RegisterType } from '../types/register.type';

export const addUser: GraphQLFieldConfig<null, IConnection> = {
  type: RegisterType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_parent, { email, password }, { res }) {
    const data = await UserService.register(email, password);
    res.cookie('refreshToken', data.jwt.refreshToken, {
      maxAge: daysToMilisecond(30),
      httpOnly: true,
    });
    return data;
  },
};
