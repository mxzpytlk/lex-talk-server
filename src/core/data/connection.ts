import { Request, Response } from 'express';

export interface IConnection {
  req: Request;
  res: Response;
  next: (object: unknown) => void;
}