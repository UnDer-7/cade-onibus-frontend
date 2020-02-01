import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from '../../environments/environment';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.clientID),
  },
]);
export function socialLoginConfig(): AuthServiceConfig {
  return config;
}
