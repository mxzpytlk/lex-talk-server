import { MDocument } from "../types";
import { JSONable } from "./jsonable";

export class User extends JSONable implements IUser {
  public email: string;
  public id: string;
  public isActivated: boolean;

  constructor(model: MDocument<IUser>) {
    super();
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}

export interface IUser {
  email: string;
  id: string;
  isActivated: boolean;
}
