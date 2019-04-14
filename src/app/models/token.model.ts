export interface Token {
  _id: string;
  email: string;
  createdAt: Date;
  exp: number;
  iat: number;
}
