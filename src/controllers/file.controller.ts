import { Request, Response } from 'express';
import { FileService } from '../services/file.service';

export class FileController {
  public static async getFile(req: Request<{id: string}>, res: Response, next: (object: unknown) => void): Promise<void> {
    try {
      const fileId = req.params.id;
      const file = await FileService.getFile(fileId);
      res.setHeader('content-type', 'image/jpeg');
      res.send(file);
    } catch (e) {
      next(e);
    }
  }
}
