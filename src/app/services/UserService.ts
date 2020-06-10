import { finalize } from 'rxjs/operators';
import { GoogleLoginResponse } from 'react-google-login';

import { UserResource } from '../resources';
import { CommonProps } from './index';
import { RunnableImpl } from '../models/types/Functions';
import { GoogleIdWithEmail } from '../models/types/SignInTypes';

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

  public createAccountWithGoogle(data: GoogleLoginResponse): void {
    const payload: GoogleIdWithEmail = {
      google_id: data.googleId,
      email: data.getBasicProfile().getEmail(),
      name: data.getBasicProfile().getName(),
    };

    UserResource.createUserWithGoogle(payload)
      .subscribe((res) => console.log('CREATE RES: ', res));
  }

}

export default new UserService();
