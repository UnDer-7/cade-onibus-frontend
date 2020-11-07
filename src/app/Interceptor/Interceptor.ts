import { Color } from '@material-ui/lab';
import { Consumer } from '@cade-tecnologia/essentials';


export default abstract class Interceptor {
  protected static showToast: Consumer<boolean>;

  protected static setMessage: Consumer<string>;

  protected static setColor: Consumer<Color>;

  public static configure(
    showToast: Consumer<boolean>,
    setMessage: Consumer<string>,
    setColor: Consumer<Color>) {
    Interceptor.showToast = showToast;
    Interceptor.setMessage = setMessage;
    Interceptor.setColor = setColor;
  }
}
