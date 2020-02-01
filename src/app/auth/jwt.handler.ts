import * as jwtDecode from 'jwt-decode';
import { Token } from '../model/token.model';

const key = 'token';

export function saveJWT(jwt: string): void {
  localStorage.setItem(key, jwt);
}

export function getJWT(): string | null {
  return localStorage.getItem(key);
}

export function removeJWT(): void {
  localStorage.removeItem(key);
}

export function decodeJWT(): Token {
  return jwtDecode(getJWT() as string);
}

export function isTokenValid(): boolean {
  try {
    jwtDecode(getJWT() as string);
    return true;
  } catch (e) {
    return false;
  }
}

export function isTokenExpired(): boolean {
  const expiration = new Date(decodeJWT().exp * 1000);
  const currentDate = new Date();

  return expiration <= currentDate;
}
