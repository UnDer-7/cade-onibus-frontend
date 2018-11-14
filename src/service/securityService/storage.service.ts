import {Injectable} from "@angular/core";
import {LocalUser} from "../../models/local_user";
import {STORAGE_KEYS} from "../../config/config";

@Injectable()
export class StorageService {
  email: string;
  public getLocalUser(): string{
    this.email = localStorage.getItem(STORAGE_KEYS.localUserEmail);
    if(this.email === null){
      return null;
    }else {
      return this.email;
    }
  }

  public setLocalUser(email: string){
    if(email == null){
      localStorage.removeItem(STORAGE_KEYS.localUserEmail);
    }else {
      localStorage.setItem(STORAGE_KEYS.localUserEmail, JSON.stringify(email));
    }
  }
}
