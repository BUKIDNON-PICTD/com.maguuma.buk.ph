import { AppConfigService } from './app-config.service';
import { NetworkService } from 'src/app/services/network.service';
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SettingService {
  constructor(private storage: Storage) {}
  settings = new BehaviorSubject<any[]>(null);

  addItem(item: any): Promise<any> {
    return this.storage.get("settings").then(items => {
      if (items) {
        items.push(item);
        this.storage.set("settings", items);
      } else {
        this.storage.set("settings", [item]);
      }
      this.settings.next(items);
      return item;
    });
  }

  // getCurrentSurveyPeriod(): any {
  //   this.getItemByName('surveyperiod').then( item => {
  //       return item.value;
  //     });
  // }
  getSettings(): Observable<any[]> {
    return this.settings.asObservable();
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

  getItemByName(name): Promise<any> {
    return this.storage.get("settings").then(items => {
      if (!items || items.length === 0) {
        return null;
      }

      return items.find(i => i.name === name);
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
      this.settings.next(newItems);
      return this.storage.set("settings", newItems);
    });
  }

  deleteItem(id: string): Promise<any> {
    return this.storage.get("settings").then(items => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: any[] = [];

      for (let i of items) {
        if (i.objid !== id) {
          toKeep.push(i);
        }
      }
      this.settings.next(toKeep);
      return this.storage.set("settings", toKeep);
    });
  }
}
