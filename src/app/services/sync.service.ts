import { ToastController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Observable, throwError, BehaviorSubject, forkJoin } from "rxjs";
import {
  tap,
  map,
  catchError,
  retry,
  expand,
  flatMap,
  switchMap
} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SyncService {

  public tblmaster: any;
  public tblfarmers: any;

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.tblmaster = new Storage({
      storeName: '_tblmaster',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });

    this.tblfarmers = new Storage({
      storeName: '_tblfarmers',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  getMasterFilesFromServer(): Observable<any> {
    var data = {
      requesttype: "get",
      servicename: "FarmerProfileService",
      methodname: "getMasterFiles"
    };

    return this.http
      .post<any>(
        `http://localhost:3000/api/serverrequest`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(
        retry(2),
        tap(res => {
          if (typeof res.data === "object" && res.data !== null) {
            Object.keys(res.data).forEach(key => {
              this.tblmaster.set(`${key}`, res.data[key]);
            });
          }
        }),
        catchError(this.handleError)
      );
  }

  prepareFarmersToSync(clientid): Observable<any> {
    var data = {
      requesttype: "post",
      servicename: "FarmerProfileService",
      methodname: "pareparefarmerlocaltoserversync",
      params: {
        clientid: clientid
      }
    };
    return this.http
      .post(
        `http://localhost:3000/api/serverrequest`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  syncFarmerData(settings): Observable<any> {
    var data = {
      requesttype: "post",
      servicename: "FarmerProfileService",
      methodname: "startfarmerlocaltoserversync",
      params: {
        clientid: settings.find(o => o.name === 'clientid').value,
        lguid: settings.find(o => o.name === 'lguid').value,
        synctype: 'farmer'
      }
    };
    return this.http
      .post<any>(
        `http://localhost:3000/api/serverrequest`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(
        retry(2),
        switchMap(res => this.confirmFarmerSync(res.data, "farmer", settings)),
        catchError(this.handleError)
      );
  }

  confirmFarmerSync(farmers, synctype, settings): Observable<any> {
    if (typeof farmers === 'object' && farmers !== null && !farmers.totalforsync) {
      for (let farmer of farmers) {
        this.tblfarmers.get(farmer.objid).then(item => {
          if (!item) {
            this.tblfarmers.set(farmer.objid, farmer).catch(error => console.log(error.message));
            // console.log('Farmer added ' + farmer.objid);
          } else {
            console.log('Farmer already exists ' + farmer.objid);
          }
        }).catch(error => console.log(error.message));
      }
    }

    var data = {
      requesttype: "post",
      servicename: "FarmerProfileService",
      methodname: "confirmsync",
      params: {
        clientid: settings.find(o => o.name === 'clientid').value,
        lguid: settings.find(o => o.name === 'lguid').value,
        items: farmers.map(item => item.objid),
        // item: farmer.objid,
        synctype: synctype
      }
    };
    return this.http
      .post<any>(
        `http://localhost:3000/api/serverrequest`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(
        map(res => {
          res.data.farmers = farmers;
          return res;
        }),
        catchError(this.handleError)
      );
  }

  // confirmFarmerSync(farmer, synctype, clientid): Observable<any> {
  //   if (typeof farmer === 'object' && farmer !== null) {
  //     this.tblfarmers.get('agri_farmerprofile').then(items => {
  //       if (!items) {
  //         items = [];
  //       }
  //       // for( let farmer of farmers) {
  //       //   let obj = items.find(o => o.objid === farmer.objid);
  //       //   if (!obj) {
  //       //     items.push(farmer);
  //       //     this.storage.set("agri_farmerprofile", items);
  //       //     console.log('Farmer added ' +  farmer.objid);
  //       //   }else {
  //       //     console.log('Farmer already exists ' + farmer.objid);
  //       //   }
  //       // }
  //       let obj = items.find(o => o.objid === farmer.objid);
  //       if (!obj) {
  //         items.push(farmer);
  //         this.tblfarmers.set('agri_farmerprofile', items).catch(error => console.log(error.message));
  //         console.log('Farmer added ' + farmer.objid);
  //       } else {
  //         console.log('Farmer already exists ' + farmer.objid);
  //       }
  //     }).catch(error => console.log(error.message));
  //   }

  //   var data = {
  //     requesttype: "post",
  //     servicename: "FarmerProfileService",
  //     methodname: "confirmsync",
  //     params: {
  //       clientid: clientid,
  //       // items: farmers.map(item => item.objid),
  //       item: farmer.objid,
  //       synctype: synctype
  //     }
  //   };
  //   return this.http
  //     .post<any>(
  //       `http://localhost:3000/api/serverrequest`,
  //       JSON.stringify(data),
  //       this.httpOptions
  //     )
  //     .pipe(
  //       map(res => res.data.farmer = farmer),
  //       catchError(this.handleError)
  //     );
  // }

  // resetSyncProgress() {
  //   this.prepEntityProgress.next(0);
  //   this.syncEntityProgress.next(0);
  //   this.prepFarmerProgress.next(0);
  //   this.syncFarmerProgress.next(0);
  // }

  // sync(clientinfo) {
  //   // this.prepareentitysync();
  //   this.preparefarmersync(clientinfo);
  //   // this.startentitysync();
  //   this.startfarmersync(clientinfo);
  // }

  // public startfarmersync(clientinfo) {
  //   this.startfarmerlocaltoserversync(clientinfo).subscribe(res => {
  //     if (typeof res.data === "object" && res.data !== null) {
  //       this.storage.get("agri_farmerprofile").then(items => {
  //         if (items) {
  //           try {
  //             for (let i of res.data) {
  //               console.log("confirmation start");
  //               let obj = items.find(o => o.objid === i.objid);
  //               if (!obj) {
  //                 items.push(i);
  //                 this.confirmsync(i.objid, "farmer", clientinfo)
  //                   .then(res => {
  //                     this.syncFarmerProgress.next(
  //                       res.data.totalsynced / res.data.totalforsync
  //                     );
  //                   })
  //                   .catch(err => {
  //                     console.log("failed confirmation for " + i.objid);
  //                   });
  //                 this.storage.set("agri_farmerprofile", items);
  //               } else {
  //                 this.confirmsync(i.objid, "farmer", clientinfo)
  //                   .then(res => {
  //                     this.syncFarmerProgress.next(
  //                       res.data.totalsynced / res.data.totalforsync
  //                     );
  //                   })
  //                   .catch(err => {
  //                     console.log("failed confirmation for " + i.objid);
  //                   });
  //                 console.log("already exist : " + i.objid);
  //               }
  //             }
  //             this.sync(clientinfo);
  //           } catch (e) {
  //             this.sync(clientinfo);
  //           }
  //         } else {
  //           try {
  //             this.storage.set("agri_farmerprofile", res.data);
  //             for (let i of res.data) {
  //               // let result = res.data.map(a => a.objid);
  //               this.confirmsync(i.objid, "farmer", clientinfo)
  //                 .then(res => {
  //                   this.syncFarmerProgress.next(
  //                     res.totalsynced / res.totalforsync
  //                   );
  //                 })
  //                 .catch(err => {
  //                   console.log("failed confirmation for " + i.objid);
  //                 });
  //             }
  //             this.sync(clientinfo);
  //           } catch (e) {
  //             this.sync(clientinfo);
  //           }
  //         }
  //       });
  //     } else {
  //       this.syncFarmerProgress.next(100);
  //     }
  //   });
  // }

  // public preparefarmersync(clientinfo) {
  //   this.pareparefarmerlocaltoserversync(clientinfo).subscribe(res => {
  //     if (typeof res.data === "object" && res.data !== null) {
  //       var data = res.data;
  //       if (data.forprep > 0) {
  //         // this.prepareentitysync();
  //         this.prepFarmerProgress.next(data.forsync / data.totalrecords);
  //       } else {
  //         this.prepFarmerProgress.next(100);
  //       }
  //     }
  //   });
  // }

  // private pareparefarmerlocaltoserversync(clientinfo): Observable<any> {
  //   var data = {
  //     requesttype: "post",
  //     servicename: "FarmerProfileService",
  //     methodname: "pareparefarmerlocaltoserversync",
  //     params: {
  //       clientid: clientinfo.value
  //     }
  //   };
  //   return this.http
  //     .post(
  //       `http://localhost:3000/api/serverrequest`,
  //       JSON.stringify(data),
  //       this.httpOptions
  //     )
  //     .pipe(catchError(this.handleError));
  // }

  // private startentitysync(clientinfo) {
  //   this.startentitylocaltoserversync(clientinfo).then(res => {
  //     if (typeof res.data === "object" && res.data !== null) {
  //       this.storage.get("entityindividual").then(items => {
  //         if (items) {
  //           try {
  //             for (let i of res.data) {
  //               console.log("confirmation start");
  //               let obj = items.find(o => o.objid === i.objid);
  //               if (!obj) {
  //                 items.push(i);
  //                 this.confirmsync(i.objid, "entity", clientinfo)
  //                   .then(res => {
  //                     this.syncEntityProgress.next(
  //                       res.data.totalsynced / res.data.totalforsync
  //                     );
  //                   })
  //                   .catch(err => {
  //                     console.log("failed confirmation for " + i.objid);
  //                   });
  //                 this.storage.set("entityindividual", items);
  //               } else {
  //                 this.confirmsync(i.objid, "entity", clientinfo)
  //                   .then(res => {
  //                     this.syncEntityProgress.next(
  //                       res.data.totalsynced / res.data.totalforsync
  //                     );
  //                   })
  //                   .catch(err => {
  //                     console.log("failed confirmation for " + i.objid);
  //                   });
  //                 console.log("already exist : " + i.objid);
  //               }
  //             }
  //             // this.startentitysync();
  //           } catch (e) {
  //             // this.startentitysync();
  //           }
  //         } else {
  //           try {
  //             this.storage.set("entityindividual", res.data);
  //             for (let i of res.data) {
  //               // let result = res.data.map(a => a.objid);
  //               this.confirmsync(i.objid, "entity",clientinfo)
  //                 .then(res => {
  //                   this.syncEntityProgress.next(
  //                     res.totalsynced / res.totalforsync
  //                   );
  //                 })
  //                 .catch(err => {
  //                   console.log("failed confirmation for " + i.objid);
  //                 });
  //             }
  //             // this.startentitysync();
  //           } catch (e) {
  //             // this.startentitysync();
  //           }
  //         }
  //       });
  //     } else {
  //       this.syncEntityProgress.next(100);
  //     }
  //   });
  // }

  // async startentitylocaltoserversync(clientinfo): Promise<any> {
  //   var data = {
  //     requesttype: "post",
  //     servicename: "FarmerProfileService",
  //     methodname: "startentitylocaltoserversync",
  //     params: {
  //       clientid: clientinfo.value
  //     }
  //   };
  //   return await this.http
  //     .post(
  //       `http://localhost:3000/api/serverrequest`,
  //       JSON.stringify(data),
  //       this.httpOptions
  //     )
  //     .pipe(catchError(this.handleError))
  //     .toPromise();
  // }

  // private startfarmerlocaltoserversync(clientinfo): Observable<any> {
  //   var data = {
  //     requesttype: "post",
  //     servicename: "FarmerProfileService",
  //     methodname: "startfarmerlocaltoserversync",
  //     params: {
  //       clientid: clientinfo.value
  //     }
  //   };
  //   return this.http
  //     .post(
  //       `http://localhost:3000/api/serverrequest`,
  //       JSON.stringify(data),
  //       this.httpOptions
  //     )
  //     .pipe(catchError(this.handleError));
  // }

  async confirmsync(item, synctype, clientid): Promise<any> {
    var data = {
      requesttype: "post",
      servicename: "FarmerProfileService",
      methodname: "confirmsync",
      params: {
        clientid: clientid,
        item: item,
        synctype: synctype
      }
    };
    return await this.http
      .post(
        `http://localhost:3000/api/serverrequest`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.handleError))
      .toPromise();
  }

  // private prepareentitysync() {
  //   this.parepareentitylocaltoserversync().subscribe(res => {
  //     if (typeof res.data === "object" && res.data !== null) {
  //       var data = res.data;
  //       if (data.forprep > 0) {
  //         // this.prepareentitysync();
  //         this.prepEntityProgress.next(data.forsync / data.totalrecords);
  //       } else {
  //         this.prepEntityProgress.next(100);
  //       }
  //     }
  //   });
  // }

  // private parepareentitylocaltoserversync(): Observable<any> {
  //   var data = {
  //     requesttype: "post",
  //     servicename: "FarmerProfileService",
  //     methodname: "parepareentitylocaltoserversync",
  //     params: {
  //       clientid: "test"
  //     }
  //   };
  //   return this.http
  //     .post(
  //       `http://localhost:3000/api/serverrequest`,
  //       JSON.stringify(data),
  //       this.httpOptions
  //     )
  //     .pipe(catchError(this.handleError));
  // }
}
