import { IJwt } from "./jwt";
import { IUser } from "./user";

export interface IRegisterSuccess {
  user: IUser;
  jwt: IJwt;
}

export interface IRegister {
  email: string;
  password: string;
}
