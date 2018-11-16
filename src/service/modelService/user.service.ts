import {User} from "../../models/user";
import {AngularFireDatabase} from "angularfire2/database";
import {Injectable} from "@angular/core";

@Injectable()
export class UserService {
  private PATH = `users/`;
  constructor(
    private afDatabese: AngularFireDatabase
  ) { }

  public async saveUser(user: User, uid: string){
    return await this.afDatabese.list(this.PATH).update(uid, {nome: user.nome, email: user.email, linha: user.linha});
  }

  public getUser(uid: string){
    return  this.afDatabese.object(this.PATH + uid.replace(/["]/g, '/')).valueChanges();
  }
}
