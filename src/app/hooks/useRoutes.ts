import { useHistory } from 'react-router-dom';
import { Runnable } from '@cade-tecnologia/essentials';
import { FORGOT_PASSWORD_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '../pages/auth/AuthRoutes';
import { HOME_PATH } from '../pages/home/HomeRoutes';

interface IUseRoutes {
  goToSignUp: Runnable,
  goToSignIn: Runnable,
  goToForgotPassword: Runnable,
  goToHome: Runnable,
}

export default function useRoutes(): IUseRoutes {
  const { push } = useHistory();

  return {
    goToSignUp: () => push(SIGN_UP_PATH),
    goToSignIn: () => push(SIGN_IN_PATH),
    goToForgotPassword: () => push(FORGOT_PASSWORD_PATH),
    goToHome: () => push(HOME_PATH),
  };
}
