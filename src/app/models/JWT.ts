import dayjs from 'dayjs';
import Assert from '../utils/Assert';

export interface RecoveryPayload {
  email: string;
  id: string;
}

export default class JWT<T> {
  public readonly token: string;

  public readonly payload: T;

  public readonly expirationDate: dayjs.Dayjs;

  public readonly issuedAt: dayjs.Dayjs;

  constructor(decoded: any) {
    function setDate(value: number): dayjs.Dayjs {
      return dayjs(new Date(value * 1000), { locale: 'pt-br'});
    }
    Assert.notNull(decoded, 'JWT decodificado esta null');

    const { token, payload, iat, exp } = decoded;
    Assert.notBlank(token);
    Assert.notNull(payload);
    Assert.notBlank(iat);
    Assert.notBlank(exp);

    this.token = token;
    this.payload = payload;
    this.expirationDate = setDate(exp);
    this.issuedAt = setDate(iat);
  }

  public isExpired(): boolean {
    Assert.notNull(this.expirationDate);
    const currentDate = dayjs();

    return currentDate.isBefore(this.expirationDate);
  }
}
