import { IJwt } from './jwt';
import { IUser } from './user';

export interface IAuthSuccess {
  user: IUser;
  jwt: IJwt;
}

export interface IRegister {
  email: string;
  password: string;
}
