export interface TokenForgotPassword {
  exp: Date;
  iat: Date;
  payload: PayloadDecoded;
}

interface PayloadDecoded {
  email: string;
  id: string;
}
