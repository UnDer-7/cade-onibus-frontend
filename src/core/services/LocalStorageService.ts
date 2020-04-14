import Assert from '../utils/Assert';

export enum Key {
  TOKEN = 'AUTH_TOKEN',
}

class LocalStorageService {
  public save(key: Key, value: string): void {
    localStorage.setItem(key, value);
  }

  public get(key: Key, throwNotFound = false): string | null {
    const value = localStorage.getItem(key);
    if (throwNotFound) {
      Assert.notNull(value, 'LocalStorage Value is Null');
    }
    return value;
  }
}

export default new LocalStorageService();
