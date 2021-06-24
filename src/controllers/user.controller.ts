import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import config from '../assets/config.json';

export class UserController {
  public static async activate(req: Request, res: Response, next: (object: unknown) => void): Promise<void> {
    try {
      const activationLink = (req.params as unknown as IActivate).link;
      await UserService.activate(activationLink);
      res.redirect(config.clientUrl);
    } catch (e) {
      next(e);
    }
  }
}

interface IActivate {
  link: string;
}
