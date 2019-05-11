import * as jwtDecode from 'jwt-decode';
import { Token } from '../models/token.model';

export function saveJWT(jwt: string): void {
  localStorage.setItem('token', jwt);
}

export function getJWT(): string | null {
  return localStorage.getItem('token');
}

export function removeJWT(): void {
  localStorage.removeItem('token');
}

export function decodeJWT(): Token {
  return jwtDecode(getJWT() as string);
}
