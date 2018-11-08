import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";

@Injectable()
export class AuthService {
  constructor(private storage: StorageService){}

  public successfulLogin(email: string){
    this.storage.setLocalUser(email);
  }
}
