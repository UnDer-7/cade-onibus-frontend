import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";
import {AngularFireAuth} from 'angularfire2/auth'
import {User} from "../../models/user";

@Injectable()
export class AuthService {
  constructor(
    private storage: StorageService,
    private afAuth: AngularFireAuth) {
  }

  public async logIn(user: User) {
    return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public successfulLogin(uid: string) {
    this.storage.setLocalUser(uid);
  }

  public async register(user: User) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  public async logout() {
    return await this.afAuth.auth.signOut();
  }
}
