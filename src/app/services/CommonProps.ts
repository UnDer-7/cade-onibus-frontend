import { AxiosResponse } from 'axios';
import { Consumer, Runnable } from '@cade-tecnologia/essentials';


export default interface CommonProps<DATA, SUCCESS> {
  data: DATA,
  onComplete?: Runnable,
  onSuccess?: Consumer<SUCCESS>
  onError?: Consumer<AxiosResponse<string>>,
}
