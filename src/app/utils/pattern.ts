export default abstract class Pattern {
  // eslint-disable-next-line no-useless-constructor,no-empty-function
  private constructor() {}

  // eslint-disable-next-line no-useless-escape
  public static readonly EMAIL: RegExp = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
}
