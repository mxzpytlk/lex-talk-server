import { AuthenticationError, UserInputError } from 'apollo-server-express';

export class ErrorService {
  public static UnauthorisedError(): AuthenticationError {
    return new AuthenticationError('User is unauthorised');
  }

  public static BadRequest(message: string): UserInputError {
    return new UserInputError(message);
  }
}
