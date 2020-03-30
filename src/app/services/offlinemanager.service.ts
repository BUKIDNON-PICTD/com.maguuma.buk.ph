import { FarmerService } from "src/app/services/farmer.service";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable, from, of, forkJoin } from "rxjs";
import { switchMap, finalize, tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController } from "@ionic/angular";

const STORAGE_REQ_KEY = "storedreq";

interface StoredRequest {
  url: string;
  type: string;
  data: any;
  time: number;
  id: string;
}

@Injectable({
  providedIn: "root"
})
export class OfflineManagerService {
  _agri_farmerprofile: Storage;
  tblfarmerlist: Storage;
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     "Content-Type": "application/json"
  //   })
  // };
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this._agri_farmerprofile = new Storage({
      storeName: "_agri_farmerprofile",
      driverOrder: ["indexeddb", "sqlite", "websql", "localstorage"]
    });

    this.tblfarmerlist = new Storage({
      storeName: "_tblfarmerlist",
      driverOrder: ["indexeddb", "sqlite", "websql", "localstorage"]
    });
  }

  checkForEvents(): Observable<any> {
    return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
      switchMap(storedOperations => {
        let storedObj = JSON.parse(storedOperations);
        if (storedObj && storedObj.length > 0) {
          return this.sendRequests(storedObj).pipe(
            finalize(() => {
              let toast = this.toastController.create({
                message: `Local data succesfully synced to API!`,
                duration: 3000,
                position: "bottom"
              });
              toast.then(toast => toast.present());
              // this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
              // this.storage.remove(STORAGE_REQ_KEY);
            })
          );
        } else {
          console.log("no local events to sync");
          return of(false);
        }
      })
    );
  }

  storeRequest(url, type, data) {
    let toast = this.toastController.create({
      message: `Your data is stored locally because you seem to be offline.`,
      duration: 3000,
      position: "bottom"
    });
    toast.then(toast => toast.present());

    let action: StoredRequest = {
      url: url,
      type: type,
      data: data,
      time: new Date().getTime(),
      id: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 5)
    };
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

    return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
      let storedObj = JSON.parse(storedOperations);

      if (storedObj) {
        storedObj.push(action);
      } else {
        storedObj = [action];
      }
      // Save old & new local transactions back to Storage
      return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
    });
  }

  sendRequests(operations: StoredRequest[]) {
    let obs = [];
    this.storage.remove(STORAGE_REQ_KEY);
    for (let op of operations) {
      console.log("Make one request: ", op);
      let oneObs = this.http
        .request<any>(op.type, op.url, {
          body: op.data,
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        })
        .pipe(
          tap(res => {
            this.updatefarmer(res.data);
          }),
          catchError(err => {
            this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
              let storedObj = JSON.parse(storedOperations);

              if (storedObj) {
                storedObj.push(op);
              } else {
                storedObj = [op];
              }
              // Save old & new local transactions back to Storage
              return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
            });
            throw new Error(err);
          })
        );
      obs.push(oneObs);
    }

    // Send out all local events and return once they are finished
    return forkJoin(obs);
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
        await this.tblfarmerlist.set("farmerlist", newItems);
      });
      return await this.getItem(farmer.objid);
    });
  }
  getItems(): Promise<any[]> {
    return this.tblfarmerlist.get("farmerlist");
  }

  getItem(objid): Promise<any> {
    return this._agri_farmerprofile.get(objid).then(item => {
      return item;
    });
  }
}
