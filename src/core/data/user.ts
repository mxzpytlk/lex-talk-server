import { MDocument } from '../types';
import { JSONable } from './jsonable';

export class User extends JSONable implements IUser {
  public email: string;
  public id: string;
  public isActivated: boolean;
  public name: string;
  public about: string;
  public avatar: string;

  constructor(model: MDocument<IUser>) {
    super();
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.name = model.name;
    this.about = model.about;
    this.avatar = model.avatar;
  }
}

export interface IUser {
  email: string;
  id: string;
  isActivated: boolean;
  password?: string;
  name?: string;
  about?: string;
  avatar?: string;
}
