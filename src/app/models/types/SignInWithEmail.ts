interface SignIn {
  email: string;
}

export interface SignInWithEmail extends SignIn {
  password: string;
}

export interface SignInWithGoogle extends SignIn {
  // eslint-disable-next-line camelcase
  google_id: string;
  name: string;
}
