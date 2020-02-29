import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class EntityService {
  _entityindividual: any;
  _entityindividuallist: any;

  constructor(private storage: Storage) {
    this._entityindividual = new Storage({
      storeName: '_entityindividual',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });

    this._entityindividuallist = new Storage({
      storeName: '_entityindividuallist',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }
  
 makelist() {
    this.getRawItems().then(items => {
      this._entityindividuallist.set('entityindividuallist', items);
    });
  }

  addfarmer(farmer: any): Promise<any> {
    return this._entityindividual.get(farmer.objid).then( item => {
      if (!item) {
        return this.storage.set(farmer.objid, farmer);
      }
    });
  }

  getItems(): Promise<any[]> {
    return this._entityindividuallist.get('entityindividuallist');
  }

  getRawItems(): Promise<any[]> {
    return this._entityindividual.keys()
    .then(keys => Promise.all(keys.map(k => this._entityindividual.get(k))));
  }

  getItem(objid): Promise<any> {
    return this._entityindividual.get(objid).then(item => {
      return item;
    });
  }

  updatefarmer(farmer: any): Promise<any> {
    return this._entityindividual.get(farmer.objid).then( item => {
      if (!item) {
        return null;
      }
      return this._entityindividual.set(farmer.objid, farmer);
    });
  }

  deletefarmer(objid:string): Promise<any> {
    return this._entityindividual.get(objid).then( item => {
      if (!item) {
        return null;
      }

      return this._entityindividual.remove(objid);
    });
  }
}
