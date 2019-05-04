import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('135231573260-b4a8r5lu99hivr1f564ul30b1sgvhlmc.apps.googleusercontent.com'),
  },
]);
export function socialLoginConfig(): AuthServiceConfig {
  return config;
}
