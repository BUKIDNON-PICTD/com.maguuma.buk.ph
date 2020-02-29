import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  public _agri_farmerprofile: any;
  public tblfarmerlist: any;

  constructor(private storage: Storage) { 
    this._agri_farmerprofile = new Storage({
      storeName: '_agri_farmerprofile',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });

    this.tblfarmerlist = new Storage({
      storeName: '_tblfarmerlist',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  makelist() {
    this.getRawItems().then(items => {
      this.tblfarmerlist.set('farmerlist', items.map(item => {
        return {
                objid:item.objid, 
                fno: item.fno,
                farmer : item.farmer
              }
        }))
    });
  }

  addfarmer(farmer: any): Promise<any> {
    return this._agri_farmerprofile.get(farmer.objid).then( item => {
      if (!item) {
        return this.storage.set(farmer.objid, farmer);
      }
    });
  }

  getItems(): Promise<any[]> {
    return this.tblfarmerlist.get('farmerlist');
  }

  getRawItems(): Promise<any[]>{
    return this._agri_farmerprofile.keys()
    .then(keys => Promise.all(keys.map(k => this._agri_farmerprofile.get(k))));
  }

  getItem(objid): Promise<any> {
    return this._agri_farmerprofile.get(objid).then(item => {
      return item;
    });
  }

  updatefarmer(farmer: any): Promise<any> {
    return this._agri_farmerprofile.get(farmer.objid).then( item => {
      if (!item) {
        return null;
      }
      return this._agri_farmerprofile.set(farmer.objid, farmer);
    });
  }

  deletefarmer(objid:string): Promise<any> {
    return this._agri_farmerprofile.get(objid).then( item => {
      if (!item) {
        return null;
      }

      return this._agri_farmerprofile.remove(objid);
    });
  }
}
