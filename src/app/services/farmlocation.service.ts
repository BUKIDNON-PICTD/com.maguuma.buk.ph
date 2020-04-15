import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: 'root'
})
export class FarmlocationService {
  public tblmaster: any;
  constructor(private storage: Storage) {
    this.tblmaster = new Storage({
      storeName: '_tblmaster',
      driverOrder: ['sqlite', 'indexeddb','websql', 'localstorage']
    });
   }

  addItem(item: any): Promise<any> {
    return this.tblmaster.get("agri_farmerprofile_location").then(items => {
      if (items) {
        items.push(item);
        return this.tblmaster.set("agri_farmerprofile_location", items);
      } else {
        return this.tblmaster.set("agri_farmerprofile_location", [item]);
      }
    });
  }

  getItems(): Promise<any[]> {
    return this.tblmaster.get("agri_farmerprofile_location");
  }

  getItem(objid): Promise<any> {
    return this.tblmaster.get("agri_farmerprofile_location").then(items => {
      if (!items || items.length === 0) {
        return null;
      }
      return items.find(i => i.objid === objid);
    });
  }

  updateItem(item: any): Promise<any> {
    return this.tblmaster.get("agri_farmerprofile_location").then(items => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];

      for (let i of items) {
        if (i.objid === item.objid) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }

      return this.tblmaster.set("agri_farmerprofile_location", newItems);
    });
  }

  deleteItem(id: string): Promise<any> {
    return this.tblmaster.get("agri_farmerprofile_location").then(items => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: any[] = [];

      for (let i of items) {
        if (i.objid !== id) {
          toKeep.push(i);
        }
      }
      return this.tblmaster.set("agri_farmerprofile_location", toKeep);
    });
  }
}
