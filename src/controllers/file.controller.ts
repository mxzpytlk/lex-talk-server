import { Request, Response } from 'express';
import { FileService } from '../services/file.service';
import { Error } from 'mongoose';
import { MessageService } from '../services/message.service';
import { checkAuth } from '../midlewares/check-auth';
import { INewMessage } from '../core/data/message';

export class ImgController {
  public static async getImg(req: Request<{ id: string }>, res: Response, next: (object: unknown) => void): Promise<void> {
    try {
      const fileId = req.params.id;
      const file = await FileService.getFile(fileId);
      res.setHeader('content-type', 'image/jpeg');
      res.send(file);
    } catch (e) {
      if (e instanceof Error.CastError) {
        res.status(400).send('No such file');
      }
      next(e);
    }
  }

  public static async sendImg(req: Request<{ id: string }>, res: Response, next: (object: unknown) => void): Promise<void> {
    try {
      const user = checkAuth(req);
      const contactId = req.params.id;
      const contentType = req.headers['content-type'];

      req.on('readable', async () => {
        const img: Buffer = req.read();
        if (img) {
          const imgId = await FileService.saveFile(img, contentType);
          const message: INewMessage = {
            contactId,
            file: imgId,
          };
          await MessageService.sendMessage(user.id, message);
          res.send(imgId);
        }
      });
    } catch (e) {
      res.status(500).send();
    }
  }
}
