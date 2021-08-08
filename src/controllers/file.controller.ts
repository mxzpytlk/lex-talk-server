import { Request, Response } from 'express';
import { FileService } from '../services/file.service';

export class ImgController {
  public static async getImg(req: Request<{ id: string }>, res: Response, next: (object: unknown) => void): Promise<void> {
    try {
      const fileId = req.params.id;
      const file = await FileService.getFile(fileId);
      res.setHeader('content-type', 'image/jpeg');
      res.send(file);
    } catch (e) {
      next(e);
    }
  }

  public static async saveImg(req: Request<{ id: string }>, res: Response, next: (object: unknown) => void): Promise<void> {
    try {
      // eslint-disable-next-line prettier/prettier
      // TODO
      // req.on('readable', function() {
      //   const img = req.read();
      //   if (img) {
      //     fs.writeFile('out.jpg', img, 'base64', (err: Error) => err && res.status(500).send());
      //   }
      // });
      res.send('SUCCESS');
    } catch (e) {
      next(e);
    }
  }
}
