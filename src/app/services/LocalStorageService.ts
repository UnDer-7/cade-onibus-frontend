import Assert from '../utils/Assert';

export enum Key {
  TOKEN = 'AUTH_TOKEN',
}

class LocalStorageService {
  public set(key: Key, value: string): void {
    localStorage.setItem(key, value);
  }

  public get(key: Key, throwNotFound = false): string | null {
    const value = localStorage.getItem(key);
    if (throwNotFound) {
      Assert.notNull(value, 'LocalStorage Value is Null');
    }
    return value;
  }

  public remove(key: Key): void {
    localStorage.removeItem(key);
  }
}

export default new LocalStorageService();
