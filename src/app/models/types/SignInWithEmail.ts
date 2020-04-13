interface SignIn {
  password: string;
}

export interface SignInWithEmail extends SignIn {
  email: string;
}

export interface SignInWithGoogle extends SignIn {
  googleID: string;
}
