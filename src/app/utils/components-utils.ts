import { environment } from '../../environments/environment';

export abstract class ComponentsUtils {
  protected readonly appColor: string = environment.contentColor;
  protected readonly appName: string = environment.appName;
}
