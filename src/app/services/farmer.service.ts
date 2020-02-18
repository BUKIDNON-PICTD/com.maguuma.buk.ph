import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private storage: Storage) { }

  addfarmer(farmer: any): Promise<any> {
    return this.storage.get('agri_farmerprofile').then( items => {
      if (items) {
        items.push(farmer);
        return this.storage.set('agri_farmerprofile', items);
      } else {
        return this.storage.set('agri_farmerprofile', [farmer]);
      }
    });
  }

  getItems(): Promise<any[]> {
    return this.storage.get('agri_farmerprofile');
  }

  getItem(objid): Promise<any> {
    return this.storage.get('agri_farmerprofile').then(items => {
      return items.find(i => i.objid === objid);
    });
  }

  updatefarmer(farmer: any): Promise<any> {
    return this.storage.get('agri_farmerprofile').then( items => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];

      for(let i of items) {
        if (i.objid == farmer.objid) {
          newItems.push(farmer);
        } else {
          newItems.push(i);
        }
      }

      return this.storage.set('agri_farmerprofile', newItems);
    });
  }

  deletefarmer(objid:string): Promise<any> {
    return this.storage.get('agri_farmerprofile').then( items => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: any[] = [];

      for (let i of items) {
        if (i.objid !== objid) {
          toKeep.push(i);
        }
      }
      return this.storage.set('agri_farmerprofile', toKeep);
    });
  }
}
