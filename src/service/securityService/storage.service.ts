import {Injectable} from "@angular/core";
import {LocalUser} from "../../models/local_user";
import {STORAGE_KEYS} from "../../config/config";

@Injectable()
export class StorageService {
  uid: string;
  public getLocalUser(): string{
    this.uid = localStorage.getItem(STORAGE_KEYS.localUserUID);
    if(this.uid === null){
      return null;
    }else {
      return this.uid;
    }
  }

  public setLocalUser(uid: string){
    if(uid == null){
      localStorage.removeItem(STORAGE_KEYS.localUserUID);
    }else {
      localStorage.setItem(STORAGE_KEYS.localUserUID, JSON.stringify(uid));
    }
  }
}
