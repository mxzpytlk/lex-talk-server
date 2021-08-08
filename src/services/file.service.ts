import { FileModel } from '../models/file.model';
import { IFile } from '../core/data/file';
import { MDocument } from '../core/types';

export class FileService {
  public static async saveFile(data: Buffer, contentType: string): Promise<string> {
    const fileDb = new FileModel({ data, contentType });
    await fileDb.save();
    return fileDb._id;
  }

  public static async getFile(id: string): Promise<Buffer> {
    const data: MDocument<IFile> = await FileModel.findById(id);
    return data.data;
  }
}
