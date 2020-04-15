import { AppConfigService } from 'src/app/services/app-config.service';
import { SettingService } from "./setting.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Network } from "@ionic-native/network/ngx";
import { ToastController, Platform } from "@ionic/angular";
import { Socket } from "ngx-socket-io";
import { ConnectionStatus } from "../interfaces/connectionstatus";

@Injectable({
  providedIn: "root"
})
export class NetworkService {
  private isApp: boolean;
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(
    ConnectionStatus.Offline
  );
  public syncserverstatus: BehaviorSubject<
    ConnectionStatus
  > = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(
    private network: Network,
    private toastController: ToastController,
    private plt: Platform,
    private socket: Socket,
    private settingservice: SettingService,
    private appConfig: AppConfigService
  ) {
    this.plt.ready().then(source => {
      if (this.plt.is("android")) {
        console.log("android");
      } else if (this.plt.is("ios")) {
        console.log("ios");
      } else {
        console.log("platform is not mobile");
      }
      this.initializeNetworkEvents();
      this.initializeSocketEvents();
      let status =
        this.network.type !== "none"
          ? ConnectionStatus.Online
          : ConnectionStatus.Offline;
      this.status.next(status);
    });
  }

  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log("WE ARE OFFLINE");
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });

    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log("WE ARE ONLINE");
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);

    let connection = status == ConnectionStatus.Offline ? "Offline" : "Online";
    let toast = this.toastController.create({
      message: `You are now ${connection}`,
      duration: 3000,
      position: "bottom"
    });
    toast.then(toast => toast.present());
  }

  initializeSocketEvents() {
    // this.settingservice.getItemByName("syncserver").then(item => {
      if (this.appConfig.syncserver) {
        this.socket.ioSocket.io.opts.query = { token: "tagabukidagri" };
        this.socket.ioSocket.io.uri = this.appConfig.syncserver
        this.socket.connect();
        this.socket.on("connect", () => {
          console.log("connection established");
          this.syncserverstatus.next(ConnectionStatus.Online);
        });
        this.socket.on("disconnect", () => {
          console.log("you have been disconnected");
          this.syncserverstatus.next(ConnectionStatus.Offline);
        });
        // this.socket.on("reconnect", () => {
        //   console.log("you have been reconnected");
        //   this.syncserverstatus.next(ConnectionStatus.Online);
        // });

        this.socket.on("reconnect_error", () => {
          console.log("attempt to reconnect has failed");
          this.syncserverstatus.next(ConnectionStatus.Offline);
        });
      }
    // });
  }

  // isSyncServerOnline(): Promise<boolean> {
  //   return this.settingservice.getItemByName("syncserver").then(item => {
  //     if (item) {
  //       this.socket.ioSocket.io.opts.query = { token: "tagabukidagri" };
  //       this.socket.ioSocket.io.uri = item.value;
  //       this.socket.connect();
  //       this.socket.on("connect", () => {
  //         console.log("connection established");
  //         this.syncserverstatus.next(ConnectionStatus.Online);
  //       });
  //       if (this.getCurrentSyncServerStatus() === ConnectionStatus.Online) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   });

    // this.socket.on("disconnect", () => {
    //   console.log("you have been disconnected");
    //   this.syncserverstatus.next(ConnectionStatus.Offline);
    // });
    // this.socket.on("reconnect", () => {
    //   console.log("you have been reconnected");
    //   this.syncserverstatus.next(ConnectionStatus.Online);
    // });

    // this.socket.on("reconnect_error", () => {
    //   console.log("attempt to reconnect has failed");
    //   this.syncserverstatus.next(ConnectionStatus.Offline);
    // });
  // }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }

  public getCurrentSyncServerStatus(): ConnectionStatus {
    return this.syncserverstatus.getValue();
  }

  public onSyncServerStatusChange(): Observable<ConnectionStatus> {
    return this.syncserverstatus.asObservable();
  }
}
