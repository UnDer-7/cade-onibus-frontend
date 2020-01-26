import { environment } from '../../environments/environment';

export abstract class ComponentsUtils {
  public readonly appColor: string = environment.contentColor;
  public readonly appName: string = environment.appName;
}
