import {Routes} from '@angular/router';

import {LoginPage} from './login/login.page';
import {NewAccountPage} from './new-account/new-account.page';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'new-account',
    component: NewAccountPage
  }
];
