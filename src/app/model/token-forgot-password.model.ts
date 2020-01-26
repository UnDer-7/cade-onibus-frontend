export interface TokenForgotPassword {
  exp: Date;
  iat: Date;
  payload: PayloadDecoded;
  tokenEncoded: string;
}

interface PayloadDecoded {
  email: string;
  id: string;
}
