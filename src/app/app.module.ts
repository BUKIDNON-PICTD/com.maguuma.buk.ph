import { PagenotfoundComponent } from "./components/pagenotfound/pagenotfound.component";
import { OlmapComponent } from "./components/olmap/olmap.component";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicModule } from "@ionic/angular";
import { Storage, IonicStorageModule } from "@ionic/storage";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { Network } from "@ionic-native/network/ngx";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

import { Camera } from "@ionic-native/Camera/ngx";
import { File } from "@ionic-native/File/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { DocumentViewer } from "@ionic-native/document-viewer/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { Base64 } from "@ionic-native/base64/ngx";
import { OlmapmoduleModule } from "./modules/olmapmodule/olmapmodule.module";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { HasroleDirective } from './directives/hasrole.directive';

function extractHostname(url) {
  var hostname;
  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }
  // hostname = hostname.split(":")[0];
  hostname = hostname.split("?")[0];
  return hostname;
}

export function jwtOptionsFactory(storage) {
  let syncserver = [];
  storage.get("settings").then(items => {
    if (items) {
      syncserver.push(
        extractHostname(items.find(o => o.name === "syncserver").value)
      );
    }
  });
  return {
    tokenGetter: () => {
      return storage.get("access_token");
    },
    whitelistedDomains: syncserver
  };
}

const config: SocketIoConfig = {
  url: "http://localhost:3001",
  options: { options: { autoConnect: false } }
};
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      driverOrder: ["indexeddb", "sqlite", "websql"]
    }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    OlmapmoduleModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
  ],
  declarations: [AppComponent, PagenotfoundComponent, HasroleDirective],
  providers: [
    InAppBrowser,
    SplashScreen,
    StatusBar,
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Network,
    Camera,
    File,
    WebView,
    FilePath,
    Base64,
    // FileTransfer,
    DocumentViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
