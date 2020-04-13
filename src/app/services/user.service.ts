import { Platform, AlertController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, catchError } from "rxjs/operators";
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private config: AppConfigService,
    private alertController: AlertController
  ) {

  }

 getItems(): Promise<any[]> {
    return this.http.get<any>(`${this.config.syncserver}/api/users`).pipe(
      tap((res) => {
        return res;
      }),
      catchError((e) => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  getItem(id): Promise<any> {
    return this.http.get<any>(`${this.config.syncserver}/api/users/` + id).pipe(
      tap((res) => {
        return res;
      }),
      catchError((e) => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  addItem(item: any): Promise<any> {
    return this.http.post(`${this.config.syncserver}/api/users/`, item).pipe(
      tap( res => {
        return res;
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  updateItem(item: any): Promise<any> {
    return this.http.put(`${this.config.syncserver}/api/users/` + item.id, item).pipe(
      tap( res => {
        return res;
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  deleteItem(id: any): Promise<any> {
    return this.http.delete(`${this.config.syncserver}/api/users/` + id).pipe(
      tap( res => {
        return res;
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"],
    });
    alert.then((alert) => alert.present());
  }
}
