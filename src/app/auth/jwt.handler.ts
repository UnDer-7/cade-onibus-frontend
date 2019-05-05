export function saveJWT(jwt: string): void {
  sessionStorage.setItem('token', jwt);
}

export function getJWT(): string | null {
  return sessionStorage.getItem('token');
}

export function removeJWT(): void {
  sessionStorage.removeItem('token');
}
