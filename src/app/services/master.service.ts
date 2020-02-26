import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public tblmaster: any;
  constructor(private storage: Storage) {
    this.tblmaster = new Storage({
      storeName: '_tblmaster',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
   }

  getMasterFile(key): Promise<any[]> {
    return this.getLocalData(`${key}`);
  }

  private getLocalData(key) {
    return this.tblmaster.get(`${key}`);
  }
}
