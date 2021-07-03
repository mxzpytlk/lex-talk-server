import { Request, Response } from 'express';
import { ApiError } from '../core/exceptions/api.error';
import { GQLError } from '../core/exceptions/graphql-error';

export function handleError(err: Error, req: Request, res: Response): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err);
    return;
  }
  res.status?.(500)?.json?.({message: 'Server.error'}) ||
    (req as unknown as Response).status?.(500)?.json?.({message: 'Server.error'});
}

export function handleGraphQLErrorFn(res: Response): (e: Error) => Error {
  return (error: Error) => {
    let resultError: GQLError;

    try {
      resultError = JSON.parse(error.message);
    } catch (e) {
      resultError = new GQLError(error.message, 500);
    }

    if (resultError.statusCode) {
      res.status(resultError.statusCode);
    }
    return resultError || error;
  }
}
