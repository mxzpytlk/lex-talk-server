import { GQLError } from './graphql-error';

export class ApiError extends GQLError {

  constructor(statusCode: number, message: string, errors: Error[] = []) {
    super(message, statusCode, errors);
  }

  public static UnauthorisedError(): ApiError {
    return new ApiError(401, 'User is unauthorised');
  }

  public static BadRequest(message: string, errors: Error[] = []): ApiError {
    return new ApiError(400, message, errors);
  }
}
