import { Request, Response } from 'express';
import { ApiError } from '../exceptions/api.error';

export function handleError(err: Error, _req: Request, res: Response): void {
  console.error(err);
  if (err instanceof ApiError) {
    res.status(err.status).json(err);
    return;
  }
  res.status(500).json({message: 'Server.error'});
}