import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError, retry } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private storage: Storage, private http: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
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

  syncOfflineFarmerProfiletoServer(){

  }

  syncOnlineFarmerProfiletoDevice(){

  }

  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${key}`, data);
  }
}
