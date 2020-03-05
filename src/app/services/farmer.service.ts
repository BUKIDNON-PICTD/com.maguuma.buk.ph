import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import * as distance from "jaro-winkler";

@Injectable({
  providedIn: "root"
})
export class FarmerService {
  public _agri_farmerprofile: any;
  public tblfarmerlist: any;

  constructor(private storage: Storage) {
    this._agri_farmerprofile = new Storage({
      storeName: "_agri_farmerprofile",
      driverOrder: ["indexeddb", "sqlite", "websql", "localstorage"]
    });

    this.tblfarmerlist = new Storage({
      storeName: "_tblfarmerlist",
      driverOrder: ["indexeddb", "sqlite", "websql", "localstorage"]
    });
  }

  async verifyfarmername(info): Promise<any[]> {
    // let info = {
    //   lastname: 'AGUILAR',
    //   firstname: 'RUFINO JOHN',
    //   middlename: 'ECALDRE'
    // };
    let matches = [];
    await this.getItems().then( items => {
      for (let i of items) {
        let n1 = info.lastname + ', ' + info.firstname;
        let n2 = i.farmer.lastname + ', ' + i.farmer.firstname;
        if ( info.middlename && i.farmer.middlename ) {
          n1 = n1 + ' ' + info.middlename;
          n2 = n2 + ' ' + i.farmer.middlename;
        }
        // console.log(n1 + ' - ' + n2);
        i.match = distance( n1, n2 ) * 100;
        if( i.match >= 80 ) {
          matches.push(i);
        }
      }
    });
    return matches.sort((a, b) =>
      a.match > b.match ? -1 : 1
    );
  }

  makelist() {
    this.getRawItems().then(items => {
      this.tblfarmerlist.set(
        "farmerlist",
        items.map(item => {
          return {
            objid: item.objid,
            fno: item.fno,
            farmer: item.farmer
          };
        })
      );
    });
  }

  addfarmer(farmer: any): Promise<any> {
    return this._agri_farmerprofile.get(farmer.objid).then( async item => {
      if (!item) {
       
        await this._agri_farmerprofile.set(farmer.objid, farmer);
        await this.getItems().then( async items => {
          if (items) {
            items.push(farmer);
            await this.tblfarmerlist.set("farmerlist", items);
          } else {
            await this.tblfarmerlist.set("farmerlist", [farmer]);
          }
        });
        return await this.getItem(farmer.objid);
      }
    });
  }

  getItems(): Promise<any[]> {
    return this.tblfarmerlist.get("farmerlist");
  }

  getRawItems(): Promise<any[]> {
    return this._agri_farmerprofile
      .keys()
      .then(keys =>
        Promise.all(keys.map(k => this._agri_farmerprofile.get(k)))
      );
  }

  getItem(objid): Promise<any> {
    return this._agri_farmerprofile.get(objid).then(item => {
      return item;
    });
  }

 updatefarmer(farmer: any): Promise<any> {
    return this._agri_farmerprofile.get(farmer.objid).then(async item => {
      if (!item) {
        return null;
      }
      console.log(farmer);
      await this._agri_farmerprofile.set(farmer.objid, farmer);
      await this.getItems().then(async items => {
        if (!items || items.length === 0) {
          return null;
        }
        let newItems: any[] = [];
  
        for (let i of items) {
          if (i.objid == farmer.objid) {
            newItems.push(farmer);
          } else {
            newItems.push(i);
          }
        }
        await this.tblfarmerlist.set('farmerlist', newItems);
      });
      return await this.getItem(farmer.objid);
    });
  }

  deletefarmer(objid: string): Promise<any> {
    return this._agri_farmerprofile.get(objid).then(item => {
      if (!item) {
        return null;
      }

      return this._agri_farmerprofile.remove(objid);
    });
  }

  
}
