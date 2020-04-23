import Assert from './Assert';

export default class EnvVariables {
  public static readonly APP_NAME: string = 'Cadê Ônibus';

  public static readonly PRIMARY_COLOR: string = '#7044ff';

  public static readonly BASE_URL: string = EnvVariables.getVariable('REACT_APP_BASE_URL');

  public static readonly GOOGLE_CLIENT_ID: string = EnvVariables.getVariable('REACT_APP_GOOGLE_CLIENT_ID');

  public static readonly DF_TRANS_BASE_URL: string = EnvVariables.getVariable('REACT_APP_DF_TRANS_BASE_URL');

  private static getVariable(name: string): string {
    const env = process.env[name];
    Assert.notBlank(env, { errorMessage: `Environment Variable [${ name }] Not Fount` });

    // @ts-ignore
    return env;
  }
}
