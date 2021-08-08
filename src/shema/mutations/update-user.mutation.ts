import { checkAuth } from '../../midlewares/check-auth';
import { ErrorService } from '../../core/exceptions/api.error';
import { UserService } from '../../services/user.service';
import { ResolveFunction } from '../../core/types';
import { IUser } from '../../core/data/user';

type UpdateUserData = {
  name: string;
  about: string;
};
type UpdateUserResolve = ResolveFunction<UpdateUserData, IUser>;

export const updateUser: UpdateUserResolve = async (_parent, data, { req }) => {
  const user = checkAuth(req);

  if (!(user.name && user.about)) {
    if (!(data.name && data.about)) {
      throw ErrorService.BadRequest('Not all fields fullfiled');
    }
  }

  return await UserService.updateInfo(user.id, data);
};
