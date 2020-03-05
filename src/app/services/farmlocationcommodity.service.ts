import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: 'root'
})
export class FarmlocationcommodityService {

  _agri_farmerprofile_location_commodity: any;
  constructor(private storage: Storage) {
    this._agri_farmerprofile_location_commodity = new Storage({
      storeName: '_agri_farmerprofile_location_commodity',
      driverOrder: ['indexeddb','sqlite', 'websql', 'localstorage']
    });
   }

   addItem(item: any): Promise<any> {
    return this._agri_farmerprofile_location_commodity.get(item.objid).then( i => {
      if (!i) {
        return this.storage.set(i.objid, item);
      }
    });
  }

  getItems(): Promise<any[]>{
    return this._agri_farmerprofile_location_commodity.keys()
    .then(keys => Promise.all(keys.map(k => this._agri_farmerprofile_location_commodity.get(k))));
  }

  getItem(objid): Promise<any> {
    return this._agri_farmerprofile_location_commodity.get(objid).then(item => {
      return item;
    });
  }

  udpateItem(item: any): Promise<any> {
    return this._agri_farmerprofile_location_commodity.get(item.objid).then( i => {
      if (!i) {
        return null;
      }
      return this._agri_farmerprofile_location_commodity.set(item.objid, item);
    });
  }

  deleteItem(objid:string): Promise<any> {
    return this._agri_farmerprofile_location_commodity.get(objid).then( item => {
      if (!item) {
        return null;
      }

      return this._agri_farmerprofile_location_commodity.remove(objid);
    });
  }
}
