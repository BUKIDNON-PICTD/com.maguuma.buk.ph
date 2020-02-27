import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  public tblfarmers: any;
  public tblfarmerlist: any;

  constructor(private storage: Storage) { 
    this.tblfarmers = new Storage({
      storeName: '_tblfarmers',
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
    return this.tblfarmers.get(farmer.objid).then( item => {
      if (!item) {
        return this.storage.set(farmer.objid, farmer);
      }
    });
  }

  getItems(): Promise<any[]> {
    return this.tblfarmerlist.get('farmerlist');
  }

  getRawItems(): Promise<any[]>{
    return this.tblfarmers.keys()
    .then(keys => Promise.all(keys.map(k => this.tblfarmers.get(k))));
  }

  getItem(objid): Promise<any> {
    return this.tblfarmers.get(objid).then(item => {
      return item;
    });
  }

  updatefarmer(farmer: any): Promise<any> {
    return this.tblfarmers.get(farmer.objid).then( item => {
      if (!item) {
        return null;
      }
      return this.tblfarmers.set(farmer.objid, farmer);
    });
  }

  deletefarmer(objid:string): Promise<any> {
    return this.tblfarmers.get(objid).then( item => {
      if (!item) {
        return null;
      }

      return this.tblfarmers.remove(objid);
    });
  }
}
