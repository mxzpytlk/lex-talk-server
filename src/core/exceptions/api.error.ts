export class ApiError extends Error {
  constructor(public readonly status: number, public readonly message: string, public readonly errors: Error[] = []) {
    super(message);
  }

  public static UnauthorisedError(): ApiError {
    return new ApiError(401, 'User is unauthorised');
  }

  public static BadRequest(message: string, errors: Error[] = []): ApiError {
    return new ApiError(400, message, errors);
  }
}