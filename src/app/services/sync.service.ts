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
  public syncProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
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

    // var testdata = {
    //   "method": "get",
    //   "servicename":"FarmerProfileService",
    //   "method":"getFarmersList",
    //   "params": {
    //     "searchtext":"",
    //     "paging":{
    //       "start":1,
    //       "limit":5
    //     }
    //   }
    // };

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
  resetProgress() {
    this.syncProgress.next(0);
  }

  syncEntity() {
    this.prepentitysync().subscribe(res => {
      if(typeof res.data === 'object' && res.data !== null) {
        var data = res.data
        if (data.forprep > 0) {
          this.syncEntity();
          this.syncProgress.next( data.forsync/data.totalrecords);
        }
      }
    });
  }

  private prepentitysync(): Observable<any> {
    var data = {
      "requesttype": "get",
      "servicename":"FarmerProfileService",
      "methodname":"prepentitysync"
    };
    return this.http.post(`http://localhost:3000/api/serverrequest`, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private sync25() {

  }
  // private startEntitySync(){
  //   this.storage.get('entitiesforsync').then(entitiesforsync => {
  //     while( entitiesforsync.length > 0 ){
  //         var data = {
  //           "requesttype": "post",
  //           "servicename":"FarmerProfileService",
  //           "methodname":"startEntitySync",
  //           "params": {
  //             "entities": entitiesforsync.slice(0, 24)
  //           }
  //         };
  //         return this.http.post(`http://localhost:3000/api/serverrequest`, JSON.stringify(data), this.httpOptions)
  //         .pipe(
  //           retry(2),
  //           catchError(this.handleError)
  //         );
  //     }
  //   });
  // }
  // private getEntitiesToSync(): Observable<any> {
  //   var data = {
  //     "requesttype": "post",
  //     "servicename":"FarmerProfileService",
  //     "methodname":"getEntitiesForSync",
  //     "params": {
  //       "entities": entitiesforsync.slice(0, 24)
  //     }
  //   };
  //   return this.http.post(`http://localhost:3000/api/serverrequest`, JSON.stringify(data), this.httpOptions)
  //   .pipe(
  //     retry(2),
  //     catchError(this.handleError)
  //   );
  // }

  syncOfflineFarmerProfiletoServer(){
    
  }

  syncOnlineFarmerProfiletoDevice(){

  }

  // private getLocalData(key) {
  //   return this.storage.get(`${key}`);
  // }
  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${key}`, data);
  }
}
