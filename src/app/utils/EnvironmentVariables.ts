import Assert from './Assert';

export default class EnvVariables {
  public static readonly APP_NAME: string = 'Cadê Ônibus';

  public static readonly PRIMARY_COLOR: string = '#7044ff';

  public static readonly API_URL: string = EnvVariables.getVariable('API_URL');

  public static readonly GOOGLE_CLIENT_ID: string = EnvVariables.getVariable('GOOGLE_CLIENT_ID');

  public static readonly DF_TRANS_BASE_URL: string = EnvVariables.getVariable('DF_TRANS_BASE_URL');

  private static getVariable(name: string): string {
    const env = process.env[`REACT_APP_${name}`];
    Assert.notBlank(env, { errorMessage: `Environment Variable [${ name }] Not Fount` });

    // @ts-ignore
    return env;
  }
}
