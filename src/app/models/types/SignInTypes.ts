interface Email {
  email: string;
}

export interface PasswordWithEmail extends Email {
  password: string;
}

export interface GoogleIdWithEmail extends Email {
  // eslint-disable-next-line camelcase
  google_id: string;
  name: string;
}
