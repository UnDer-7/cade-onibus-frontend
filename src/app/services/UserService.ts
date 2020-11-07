import { finalize } from 'rxjs/operators';
import { GoogleLoginResponse } from 'react-google-login';

import { UserResource } from '../resources';
import { CommonProps } from './index';
import { GoogleIdWithEmail } from '../models/types/SignInTypes';
import { ConsumerImpl, RunnableImpl } from '@cade-tecnologia/essentials';

class UserService {
  public updatePassword(
    {
      data,
      onComplete = RunnableImpl,
    }: CommonProps<{ password: string, token: string }, any>
  ): void {
    UserResource.updatePassword(data)
      .pipe(finalize(onComplete))
      .subscribe();
  }

  public createAccountWithGoogle({
                                   data,
                                   onComplete = RunnableImpl,
                                   onError = ConsumerImpl,
                                   onSuccess = ConsumerImpl,
                                 }: CommonProps<GoogleLoginResponse, any>): void {
    const payload: GoogleIdWithEmail = {
      google_id: data.googleId,
      email: data.getBasicProfile().getEmail(),
      name: data.getBasicProfile().getName(),
    };

    UserResource.createUserWithGoogle(payload)
      .pipe(finalize(onComplete))
      .subscribe(
        onSuccess,
        onError,
      );
  }

}

export default new UserService();
