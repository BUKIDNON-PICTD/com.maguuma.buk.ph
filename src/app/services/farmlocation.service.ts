import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: 'root'
})
export class FarmlocationService {
  _agri_farmerprofile_location: any;
  constructor(private storage: Storage) {
    this._agri_farmerprofile_location = new Storage({
      storeName: '_agri_farmerprofile_location',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
   }

   addItem(item: any): Promise<any> {
    return this._agri_farmerprofile_location.get(item.objid).then( i => {
      if (!i) {
        return this.storage.set(i.objid, item);
      }
    });
  }

  getItems(): Promise<any[]> {
    return this._agri_farmerprofile_location.keys()
    .then(keys => Promise.all(keys.map(k => this._agri_farmerprofile_location.get(k))));
  }

  getItem(objid): Promise<any> {
    return this._agri_farmerprofile_location.get(objid).then(item => {
      return item;
    });
  }

  udpateItem(item: any): Promise<any> {
    return this._agri_farmerprofile_location.get(item.objid).then( i => {
      if (!i) {
        return null;
      }
      return this._agri_farmerprofile_location.set(item.objid, item);
    });
  }

  deleteItem(objid:string): Promise<any> {
    return this._agri_farmerprofile_location.get(objid).then( item => {
      if (!item) {
        return null;
      }

      return this._agri_farmerprofile_location.remove(objid);
    });
  }

}
