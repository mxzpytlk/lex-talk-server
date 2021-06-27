export class GQLError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly errors: Error[] = []
  ) { 
    super(message);
    this.message = JSON.stringify({...this, message, statusCode});
  }
}