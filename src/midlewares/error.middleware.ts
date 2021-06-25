import { Request, Response } from 'express';
import { ApiError } from '../core/exceptions/api.error';

export function handleError(err: Error, req: Request, res: Response): void {
  console.error(err);
  if (err instanceof ApiError) {
    res.status(err.status).json(err);
    return;
  }
  res.status?.(500)?.json?.({message: 'Server.error'}) ||
    (req as unknown as Response).status?.(500)?.json?.({message: 'Server.error'});
}