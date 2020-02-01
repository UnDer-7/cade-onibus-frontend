export interface GoogleUser {
  email?:          string;
  userId?:         string;
  displayName?:    string;
  familyName?:     string;
  givenName?:      string;
  imageUrl?:       string;
  idToken?:        string; // idToken that can be exchanged to verify user identity
  serverAuthCode?: string; // Auth code that can be exchanged for an access token and refresh token for offline access
  accessToken?:    string; // OAuth2 access token
}
