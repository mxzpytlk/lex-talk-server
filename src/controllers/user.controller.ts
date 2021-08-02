import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import config from '../assets/config.json';
import { checkAuth } from '../midlewares/check-auth';

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

  public static async saveAvatar(req: Request, res: Response, next: (object: unknown) => void): Promise<void> {
    try {
      const user = checkAuth(req);

      req.on('readable', async () => {
        const img: Buffer = req.read();
        if (img) {
          const imgId = await UserService.saveAvatar(img, req.headers['content-type'], user.id);
          res.send(imgId);
        }
      });
    } catch (e) {
      next(e);
    }
  }
}

interface IActivate {
  link: string;
}
