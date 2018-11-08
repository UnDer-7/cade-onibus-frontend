import {Injectable} from "@angular/core";
import {LocalUser} from "../../models/local_user";
import {STORAGE_KEYS} from "../../config/config";

@Injectable()
export class StorageService {

  public getLocalUser(): string{
    let email = localStorage.getItem(STORAGE_KEYS.localUserEmail);
    if(email === null){
      return null;
    }else {
      return email;
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
