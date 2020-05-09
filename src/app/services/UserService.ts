import { finalize } from 'rxjs/operators';

import { UserResource } from '../resources';
import { CommonProps } from './index';
import { RunnableImpl } from '../models/types/Functions';

class UserService {
  public updatePassword(
    {
      data,
      onComplete = RunnableImpl,
    }: CommonProps<{password: string, token: string}, any>
  ): void {
    UserResource.updatePassword(data)
      .pipe(finalize(onComplete))
      .subscribe();
  }
}

export default new UserService();
