import { Response } from 'express';

export interface IConnection {
  res: Response;
  next: (object: unknown) => void;
}