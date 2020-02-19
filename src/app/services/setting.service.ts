import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";


@Injectable({
  providedIn: "root"
})
export class SettingService {
 

  constructor(private storage: Storage) {

  }

  addItem(item: any): Promise<any> {
    return this.storage.get("settings").then(items => {
      if (items) {
        items.push(item);
        return this.storage.set("settings", items);
      } else {
        return this.storage.set("settings", [item]);
      }
    });
  }

  getItems(): Promise<any[]> {
    return this.storage.get("settings");
  }

  getItem(item): Promise<any> {
    return this.storage.get("settings").then(items => {
      if (!items || items.length === 0) {
        return null;
      }
     
      return items.find(i => i.objid === item.objid);
    });
  }

  updateItem(item: any): Promise<any> {
    return this.storage.get("settings").then(items => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];

      for (let i of items) {
        if (i.objid == item.objid) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }

      return this.storage.set("settings", newItems);
    });
  }

  deleteItem(id:string): Promise<any> {
    return this.storage.get('settings').then( items => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: any[] = [];

      for (let i of items) {
        if (i.objid !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set('settings', toKeep);
    });
  }
}
