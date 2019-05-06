import * as jwtDecode from 'jwt-decode';
import { Token } from '../models/token.model';

export function saveJWT(jwt: string): void {
  sessionStorage.setItem('token', jwt);
}

export function getJWT(): string | null {
  return sessionStorage.getItem('token');
}

export function removeJWT(): void {
  sessionStorage.removeItem('token');
}

export function decodeJWT(): Token {
  return jwtDecode(getJWT() as string);
}
