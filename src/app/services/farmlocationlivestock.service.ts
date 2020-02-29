import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: 'root'
})
export class FarmlocationlivestockService {

  
  _agri_farmerprofile_location_livestock: any;
  constructor(private storage: Storage) {
    this._agri_farmerprofile_location_livestock = new Storage({
      storeName: '_agri_farmerprofile_location_livestock',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
   }

   addItem(item: any): Promise<any> {
    return this._agri_farmerprofile_location_livestock.get(item.objid).then( i => {
      if (!i) {
        return this.storage.set(i.objid, item);
      }
    });
  }

  getItems(): Promise<any[]>{
    return this._agri_farmerprofile_location_livestock.keys()
    .then(keys => Promise.all(keys.map(k => this._agri_farmerprofile_location_livestock.get(k))));
  }

  getItem(objid): Promise<any> {
    return this._agri_farmerprofile_location_livestock.get(objid).then(item => {
      return item;
    });
  }

  udpateItem(item: any): Promise<any> {
    return this._agri_farmerprofile_location_livestock.get(item.objid).then( i => {
      if (!i) {
        return null;
      }
      return this._agri_farmerprofile_location_livestock.set(item.objid, item);
    });
  }

  deleteItem(objid:string): Promise<any> {
    return this._agri_farmerprofile_location_livestock.get(objid).then( item => {
      if (!item) {
        return null;
      }

      return this._agri_farmerprofile_location_livestock.remove(objid);
    });
  }
}
