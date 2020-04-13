export default abstract class Assert {
  public static notNull(value: any, errorMessage = 'value is null'): void {
    if (value === null || value === undefined) {
      throw new Error(errorMessage);
    }
  }
}
