import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ReportService {
  reportserver: string;
  // http://<host>:<port>/jasperserver[-pro]/rest_v2/reports/reports/samples/Cascading_multi_select_report.html? Country_multi_select=USA&Cascading_state_multi_select=WA&Cascading_state_multi_select=CA

  constructor(private http: HttpClient) {
    this.reportserver = "http://localhost:8090/jasperserver/rest_v2/reports";
  }

  getFarmerMasterListReport(): Promise<any> {
    // var param = {
    //   lguprovince : "059",
    //   lgumunicipality : "059-22",
    //   lgubarangay : "059-22-001"
    // };

    // var param = {
    //   "Country_multi_select" : "USA",
    //   "Cascading_state_multi_select" : "WA"

    // "Authorization": "Basic "+ btoa('jasperadmin:jasperadmin'),
    // "Access-Control-Allow-Origin":  "http://localhost:8100",
    // "Access-Control-Allow-Credentials" : "true"
    let headers = new HttpHeaders({
      "X-Remote-Domain" : "1"
    });
    // var param = {
    //   j_username: "jasperadmin",
    //   j_password: "jasperadmin"
    // };

    return this.http
      .get(
        this.reportserver + "/reports/interactive/CustomersReport.html",
        {
          headers: headers,
          withCredentials: true
          // params: param,
          // responseType: 'arraybuffer'
        }
      )
      .pipe(
        tap(res => {
          console.log(res);
        }),
        catchError(err => {
          // this.offlineManager.storeRequest(
          //   this.syncserver + `/api/serverrequest`,
          //   "post",
          //   data
          // );
          throw new Error(err.message);
        })
      )
      .toPromise();
  }
}
