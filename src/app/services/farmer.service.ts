import { UserData } from "./../providers/user-data";
import { OfflineManagerService } from "./offlinemanager.service";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import * as distance from "jaro-winkler";
import { Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { SettingService } from "./setting.service";
import { retry, tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FarmerService {
  public _agri_farmerprofile: any;
  public tblfarmerlist: any;
  syncserver: any;

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private settingservice: SettingService,
    private offlineManager: OfflineManagerService,
    private userData: UserData
  ) {
    this._agri_farmerprofile = new Storage({
      storeName: "_agri_farmerprofile",
      driverOrder: ["indexeddb", "sqlite", "websql", "localstorage"]
    });

    this.tblfarmerlist = new Storage({
      storeName: "_tblfarmerlist",
      driverOrder: ["indexeddb", "sqlite", "websql", "localstorage"]
    });

    this.settingservice.getItemByName("syncserver").then(item => {
      this.syncserver = item.value;
    });
  }
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  // handleError(error: HttpErrorResponse, data: any) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error("An error occurred:", error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` + `body was: ${error.error}`
  //     );
  //   }
  //   this.offlineManager.storeRequest(
  //         this.syncserver + `/api/serverrequest`,
  //         "post",
  //         data
  //       );
  //   // return an observable with a user-facing error message
  //   return throwError("Something bad happened; please try again later.");
  // }

  async verifyfarmername(info): Promise<any[]> {
    // let info = {
    //   lastname: 'AGUILAR',
    //   firstname: 'RUFINO JOHN',
    //   middlename: 'ECALDRE'
    // };
    let matches = [];
    await this.getItems().then(items => {
      for (let i of items) {
        let n1 = info.lastname + ", " + info.firstname;
        let n2 = i.farmer.lastname + ", " + i.farmer.firstname;
        if (info.middlename && i.farmer.middlename) {
          n1 = n1 + " " + info.middlename;
          n2 = n2 + " " + i.farmer.middlename;
        }
        // console.log(n1 + ' - ' + n2);
        i.match = distance(n1, n2) * 100;
        if (i.match >= 80) {
          matches.push(i);
        }
      }
    });
    return matches.sort((a, b) => (a.match > b.match ? -1 : 1));
  }

  makelist() {
    this.getRawItems().then(items => {
      this.tblfarmerlist.set(
        "farmerlist",
        items.map(item => {
          if (item.objid) {
            return {
              objid: item.objid,
              fno: item.fno,
              farmer: item.farmer
            };
          }
        })
      );
    });
  }

  addfarmer(farmer: any): Promise<any> {
    return this._agri_farmerprofile.get(farmer.objid).then(async item => {
      var lguid = "";
      await this.settingservice.getItemByName("lguid").then(o => {
        lguid = o.value;
      });
      var username = "";
      await this.userData.getUsername().then(o => {
        username = o;
      });
      if (!item) {
        farmer.lguid = lguid;
        var params = {
          farmer: farmer,
          username: username
        };

        // console.log(farmer);
        await this.addFarmerApi(params).then(res => {
          farmer = res.data;
        })
        .catch(e => {
          if (e) {
            return;
          }
          throwError(e);
        });
        await this._agri_farmerprofile.set(farmer.objid, farmer);
        await this.getItems().then(async items => {
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

  addFarmerApi(params): Promise<any> {
    var data = {
      requesttype: "post",
      servicename: "FarmerProfileService",
      methodname: "addFarmerProfile",
      params: {
        farmer: params.farmer,
        username: params.username
      }
    };

    return this.http
      .post<any>(
        this.syncserver + `/api/serverrequest`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(
        tap(res => {
          console.log(res);
        }),
        catchError(err => {
          this.offlineManager.storeRequest(
            this.syncserver + `/api/serverrequest`,
            "post",
            data
          );
          throw new Error(err);
        })
      )
      .toPromise();
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
      var lguid = "";
      await this.settingservice.getItemByName("lguid").then(o => {
        lguid = o.value;
      });
      var username = "";
      await this.userData.getUsername().then(o => {
        username = o;
      });

      if (!item) {
        return null;
      }
      farmer.lguid = lguid;
        var params = {
          farmer: farmer,
          username: username
        };

      await this.updateFarmerApi(params).then(res => {
        farmer = res.data;
      })
      .catch(e => {
        if (e) {
          return;
        }
        throwError(e);
      });

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
        await this.tblfarmerlist.set("farmerlist", newItems);
      });
      return await this.getItem(farmer.objid);
    });
  }

  updateFarmerApi(params): Promise<any> {
    var data = {
      requesttype: "post",
      servicename: "FarmerProfileService",
      methodname: "updateFarmerProfile",
      params: {
        farmer: params.farmer,
        username: params.username
      }
    };

    return this.http
      .post<any>(
        this.syncserver + `/api/serverrequest`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(
        tap(res => {
          console.log(res);
        }),
        catchError(err => {
          this.offlineManager.storeRequest(
            this.syncserver + `/api/serverrequest`,
            "post",
            data
          );
          throw new Error(err);
        })
      )
      .toPromise();
  }

  deletefarmer(objid: string): Promise<any> {
    return this._agri_farmerprofile.get(objid).then(async item => {
      if (!item) {
        return null;
      }

      await this._agri_farmerprofile.remove(objid);
      await this.getItems().then(async items => {
        if (!items || items.length === 0) {
          return null;
        }

        let updateditems = items.filter(o => o.objid !== objid);
        await this.tblfarmerlist.set("farmerlist", updateditems);
      });
      return this.getItems();
    });
  }

  create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
}
