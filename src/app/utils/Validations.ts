import { ValidationOptions } from 'react-hook-form';

export default abstract class Validations {
  public static readonly PASSWORD: ValidationOptions = {
    required: true,
    minLength: {
      message: 'tamanho minimo é 3',
      value: 3,
    },
  };

  // eslint-disable-next-line no-useless-escape
  private static readonly EMAIL_PATTERN: RegExp = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  public static readonly EMAIL: ValidationOptions = {
    required: true,
    pattern: {
      value: Validations.EMAIL_PATTERN,
      message: 'e-mail inválido',
    },
  };
}
