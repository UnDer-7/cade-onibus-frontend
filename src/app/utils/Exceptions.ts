abstract class Exception extends Error {
  protected constructor(
    public readonly message: string,
    public readonly error: any,
  ) {
    super(message);

    // eslint-disable-next-line no-console
    console.warn('Thrown error: ', error);
  }
}

export class JWTInvalidException extends Exception {
  constructor(
    public readonly message: string,
    public readonly error: any,
  ) {
    super(message, error);
  }
}

export class AssertException extends Exception {
  constructor(
    public readonly message: string
  ) {
    super(message, null);
  }
}
