export default class EnvVariables {
  public static readonly APP_NAME: string = 'Cadê Ônibus';

  public static readonly PRIMARY_COLOR: string = '#7044ff';

  public static readonly BASE_URL: string = EnvVariables.getVariable('REACT_APP_BASE_URL');

  public static readonly DF_TRANS_BASE_URL: string = EnvVariables.getVariable('REACT_APP_DF_TRANS_BASE_URL');

  private static getVariable(name: string): string {
    const env = process.env[name];
    if (!env) throw new Error(`Environment Variable [${ name }] Not Fount`);
    return env;
  }
}
