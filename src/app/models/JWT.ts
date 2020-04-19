import dayjs from 'dayjs';
import Assert from '../utils/Assert';

export default class JWT {
  public readonly token: string;

  public readonly email: string;

  public readonly expirationDate: dayjs.Dayjs;

  public readonly issuedAt: dayjs.Dayjs;

  constructor(decoded: any) {
    function setDate(value: number): dayjs.Dayjs {
      return dayjs(new Date(value * 1000), { locale: 'pt-br'});
    }

    Assert.notNull(decoded, 'JWT decodificado esta null');

    const { token, email, iat, exp } = decoded;
    Assert.notBlank(token);
    Assert.notBlank(email);
    Assert.notBlank(iat);
    Assert.notBlank(exp);

    this.token = token;
    this.email = email;
    this.expirationDate = setDate(exp);
    this.issuedAt = setDate(iat);
  }

  public isExpired(): boolean {
    Assert.notNull(this.expirationDate);
    const currentDate = dayjs();

    return currentDate.isBefore(this.expirationDate);
  }
}
