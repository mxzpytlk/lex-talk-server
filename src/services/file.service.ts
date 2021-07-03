import { FileUpload } from 'graphql-upload';
import { FileModel } from '../models/file.model';

import { parse } from 'path';

export class FileService {
  public static async saveFile(file: FileUpload): Promise<string> {
    return new Promise((resolve) => {
      const stream = file.createReadStream();

      let fileBuf: Buffer | string;
      stream.on('data', (buf) => {
        fileBuf = buf;
      });
      stream.on('end', async () => {
        const ext = parse(file.filename).ext;
        const fileDb = new FileModel({ data: fileBuf, contentType: ext });
        await fileDb.save();
        resolve(fileDb._id);
      })
    });
  }
}