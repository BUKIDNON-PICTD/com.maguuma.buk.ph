import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private storage: Storage) { }

  getMasterFile(key): Promise<any[]> {
    return this.getLocalData(`${key}`);
  }

  private getLocalData(key) {
    return this.storage.get(`${key}`);
  }
}
