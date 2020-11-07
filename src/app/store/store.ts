import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

class UserStore {
  private readonly observable = new BehaviorSubject<User | null>(null);

  public send(user: User): void {
    this.observable.next(user);
  }

  public current(): User | null {
    return this.observable.getValue();
  }

  public listen(): Observable<User | null> {
    return this.observable.asObservable();
  }
}

export default new UserStore();
