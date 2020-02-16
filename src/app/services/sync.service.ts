import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, map, catchError, retry } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class SyncService {
  public prepEntityProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public syncEntityProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public prepFarmerProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public syncFarmerProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private storage: Storage, private http: HttpClient, private toastController: ToastController) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    let toast = this.toastController.create({
      message: `Cannot connect to sync server!`,
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getMasterFilesFromServer(): Observable<any>{
    var data = {
      "requesttype": "get",
      "servicename":"FarmerProfileService",
      "methodname":"getMasterFiles"
    };

    return this.http.post(`http://localhost:3000/api/serverrequest`, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  resetSyncProgress() {
    this.prepEntityProgress.next(0);
    this.syncEntityProgress.next(0);
    this.prepFarmerProgress.next(0);
    this.syncFarmerProgress.next(0);
  }

  sync() {
    this.prepareentitysync();
    this.preparefarmersync();
    this.startentitysync();
    this.startfarmersync();
  }

  public startfarmersync() {
    this.startfarmerlocaltoserversync().subscribe( res => {
      if(typeof res.data === 'object' && res.data !== null) {
        this.storage.get('agri_farmerprofile').then(items => {
          if (items) {
            try{
              for(let i of res.data) {
                console.log('confirmation start');
                let obj = items.find(o => o.objid === i.objid);
                if (!obj) {
                  items.push(i);
                  this.confirmsync(i.objid, 'farmer').then( res => {
                    this.syncFarmerProgress.next( res.data.totalsynced/res.data.totalforsync);
                  }).catch( err  => {
                    console.log("failed confirmation for " + i.objid);
                  });
                  this.storage.set('agri_farmerprofile', items);
                } else {
                  this.confirmsync(i.objid, 'farmer').then( res => {
                    this.syncFarmerProgress.next( res.data.totalsynced/res.data.totalforsync);
                  }).catch( err  => {
                    console.log("failed confirmation for " + i.objid);
                  });
                  console.log('already exist : ' + i.objid);
                }
              }
              this.sync();
            } catch (e) {
              this.sync();
            }
          } else {
            try {
              this.storage.set('agri_farmerprofile', res.data);
              for (let i of res.data) {
                // let result = res.data.map(a => a.objid);
                this.confirmsync(i.objid, 'farmer').then( res => {
                  this.syncFarmerProgress.next( res.totalsynced/res.totalforsync);
                }).catch( err  => {
                  console.log("failed confirmation for " + i.objid);
                });
              }
              this.sync();
            } catch (e) {
              this.sync();
            }
          }
        });
      } else {
        this.syncFarmerProgress.next(100);
      }
    });
  }

  public preparefarmersync() {
    this.pareparefarmerlocaltoserversync().subscribe(res => {
      if(typeof res.data === 'object' && res.data !== null) {
        var data = res.data
        if (data.forprep > 0) {
          // this.prepareentitysync();
          this.prepFarmerProgress.next( data.forsync/data.totalrecords);
        }else{
          this.prepFarmerProgress.next(100);
        }
      }
    });
  }

  private pareparefarmerlocaltoserversync(): Observable<any> {
    var data = {
      "requesttype": "post",
      "servicename":"FarmerProfileService",
      "methodname":"pareparefarmerlocaltoserversync",
      "params": {
            "clientid":"test"
      }
    };
    return this.http.post(`http://localhost:3000/api/serverrequest`, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  private startentitysync() {
    this.startentitylocaltoserversync().then( res => {
      if(typeof res.data === 'object' && res.data !== null) {
        this.storage.get('entityindividual').then(items => {
          if (items) {
            try{
              for(let i of res.data) {
                console.log('confirmation start');
                let obj = items.find(o => o.objid === i.objid);
                if (!obj) {
                  items.push(i);
                this.confirmsync(i.objid, 'entity').then( res => {
                    this.syncEntityProgress.next( res.data.totalsynced/res.data.totalforsync);
                  }).catch( err  => {
                    console.log("failed confirmation for " + i.objid);
                  });
                  this.storage.set('entityindividual', items);
                } else {
                  this.confirmsync(i.objid, 'entity').then( res => {
                    this.syncEntityProgress.next( res.data.totalsynced/res.data.totalforsync);
                  }).catch( err  => {
                    console.log("failed confirmation for " + i.objid);
                  });
                  console.log('already exist : ' + i.objid);
                }
              }
              // this.startentitysync();
            } catch (e) {
              // this.startentitysync();
            }
          } else {
            try {
              this.storage.set('entityindividual', res.data);
              for (let i of res.data) {
                // let result = res.data.map(a => a.objid);
                this.confirmsync(i.objid, 'entity').then( res => {
                  this.syncEntityProgress.next( res.totalsynced/res.totalforsync);
                }).catch( err => {
                  console.log("failed confirmation for " + i.objid);
                });
              }
              // this.startentitysync();
            } catch (e) {
              // this.startentitysync();
            }
          }
        });
      } else {
        this.syncEntityProgress.next(100);
      }
    });
  }

  async startentitylocaltoserversync(): Promise<any> {
    var data = {
      "requesttype": "post",
      "servicename":"FarmerProfileService",
      "methodname":"startentitylocaltoserversync",
      "params": {
          "clientid":"test"
      }
    };
    return await this.http.post(`http://localhost:3000/api/serverrequest`, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  private startfarmerlocaltoserversync(): Observable<any> {
    var data = {
      "requesttype": "post",
      "servicename":"FarmerProfileService",
      "methodname":"startfarmerlocaltoserversync",
      "params": {
          "clientid":"test"
      }
    };
    return this.http.post(`http://localhost:3000/api/serverrequest`, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  async confirmsync(item, synctype): Promise<any> {
    var data = {
      "requesttype": "post",
      "servicename":"FarmerProfileService",
      "methodname":"confirmsync",
      "params": {
            "clientid":"test",
            "item": item,
            "synctype": synctype
      }
    };
    return await this.http.post(`http://localhost:3000/api/serverrequest`, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  private prepareentitysync() {
    this.parepareentitylocaltoserversync().subscribe(res => {
      if(typeof res.data === 'object' && res.data !== null) {
        var data = res.data
        if (data.forprep > 0) {
          // this.prepareentitysync();
          this.prepEntityProgress.next( data.forsync/data.totalrecords);
        }else{
          this.prepEntityProgress.next(100);
        }
      }
    });
  }

  private parepareentitylocaltoserversync(): Observable<any> {
    var data = {
      "requesttype": "post",
      "servicename":"FarmerProfileService",
      "methodname":"parepareentitylocaltoserversync",
      "params": {
            "clientid":"test"
      }
    };
    return this.http.post(`http://localhost:3000/api/serverrequest`, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  // private getLocalData(key) {
  //   return this.storage.get(`${key}`);
  // }
  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${key}`, data);
  }
}
