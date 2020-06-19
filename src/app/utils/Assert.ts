import { AssertException } from './Exceptions';
import Verify from './Verify';

export default abstract class Assert {
  public static notNull(value: any, errorMessage?: string): void {
    if (value === null || value === undefined) {
      if (!errorMessage) {
        // eslint-disable-next-line no-param-reassign
        errorMessage = 'Not Null assertion failed';
      }

      throw new AssertException(errorMessage);
    }
  }

  public static notBlank(value: string | null | undefined, options?: AssertOptions): void {
    let errorMessage = options?.errorMessage;
    const handleNull = options?.handleNull || true;

    if (handleNull) Assert.notNull(value, errorMessage);

    if (!value!.toString().replace(/\s/g, '').length) {
      if (!errorMessage) {
        // eslint-disable-next-line no-param-reassign
        errorMessage = 'Not Empty assertion failed';
      }

      throw new AssertException(errorMessage);
    }
  }
}

interface AssertOptions {
  errorMessage?: string;
  handleNull?: boolean;
}
