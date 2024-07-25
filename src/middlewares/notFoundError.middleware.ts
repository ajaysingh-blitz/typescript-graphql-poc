export class NotFoundError extends Error {
  public status: number;
  constructor(message: string, status?: number) {
    // Calling parent constructor of base Error class.
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Setting preferred HTTP status for this error types.
    // `404` is the default value if not specified, since it is not found
    this.status = status || 404;
  }
}
