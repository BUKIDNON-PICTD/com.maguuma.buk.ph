import { FarmlocationService } from './farmlocation.service';
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class MapService {
  public _agri_map: any;

  constructor(private storage: Storage, private farmlocationService: FarmlocationService) {
    this._agri_map = new Storage({
      storeName: "_agri_map",
      driverOrder: ["sqlite", "indexeddb", "websql", "localstorage"]
    });
  }

  makemap() {
   this._agri_map.remove("maplist");
   this.farmlocationService.getItems().then(async items => {
      this._agri_map.set(
        "maplist",
        items.filter( item => item.geolocation && item.geolocation?.type === 'FeatureCollection' ).map(item => item.geolocation)
      );
    });
  }

  saveItem(item: any): Promise<any> {
    return this.getItems().then(async items => {
      if (!items) {
        await this._agri_map.set("maplist", [item]);
      } else {
        if (items.find(o => o.features[0].id === item.features[0].id)) {
          return this.updateItem(item);
        } else {
          items.push(item);
          await this._agri_map.set("maplist", items);
        }

      }
      return await this.getItem(item.id);
    });
  }

  updateItem(item: any): Promise<any> {
    return this._agri_map.get("maplist").then(items => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];

      for (let i of items) {
        if (i.features[0].id === item.features[0].id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }

      return this._agri_map.set("maplist", newItems);
    });
  }

  getItems(): Promise<any[]> {
    return this._agri_map.get("maplist");
  }

  getItem(id): Promise<any> {
    return this.getItems().then(items => {
      return items.find(o => o.id === id);
    });
  }

  // updateItem(item: any): Promise<any> {
  //   return this.getItems().then(async items => {
  //     if (!items || items.length === 0) {
  //       return null;
  //     }
  //     let newItems: any[] = [];

  //     for (let i of items) {
  //       if (i.objid == item.objid) {
  //         newItems.push(item);
  //       } else {
  //         newItems.push(i);
  //       }
  //     }
  //     await this._agri_map.set("maplist", newItems);
  //     return await this.getItem(item.objid);
  //   });
  // }

  deleteItem(id: string): Promise<any> {
    return this.getItems().then(async items => {
      if (!items || items.length === 0) {
        return null;
      }

      let updateditems = items.filter( o => o.features[0].id !== id);
      await this._agri_map.set("maplist", updateditems);
      return this.getItems();
    });
  }
}
