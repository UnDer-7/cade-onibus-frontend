import { AxiosResponse } from 'axios';

import { Consumer, Runnable } from '../models/types/Functions';

export default interface CommonProps<DATA, SUCCESS> {
  data: DATA,
  onComplete?: Runnable,
  onSuccess?: Consumer<SUCCESS>
  onError?: Consumer<AxiosResponse<string>>,
}
