import { AuthService } from 'src/app/services/auth.service';
import { SettingService } from './../../services/setting.service';
import { DocumentViewer, DocumentViewerOptions } from "@ionic-native/document-viewer/ngx";
import { ReportService } from "./../../services/report.service";
import { Component, OnInit } from "@angular/core";
import { File } from "@ionic-native/File/ngx";
import { Platform } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UrlSerializer, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { UserData } from 'src/app/providers/user-data';

@Component({
  selector: "app-reportlist",
  templateUrl: "./reportlist.page.html",
  styleUrls: ["./reportlist.page.scss"]
})
export class ReportlistPage implements OnInit {
  content: any;
  loggedIn = false;
  reports = [
        {
          title: 'Farmer Master List',
          url: '/report/list/farmerlist'
        },
        {
          title: 'Farmer List Crosstab',
          url: '/report/list/farmerlistcrosstab'
        },
        {
          title: 'Commodity Crosstab (Area)',
          url: '/report/list/comodityareacrosstab'
        },
        {
          title: 'Commodity Crosstab (Farmer)',
          url: '/report/list/comodityfarmercrosstab'
        }
      ];
  // trustedUrl: SafeResourceUrl;
  constructor(
    // private platfrom: Platform,
    private reportService: ReportService,
    // private document: DocumentViewer,
    // private file: File,
    // private domSanitizer : DomSanitizer,
    // // private transfer: FileTransfer
    private settingService: SettingService,
    // private urlserializer: UrlSerializer,
    // private router: Router,
    private userData: UserData,
    private authService: AuthService
  ) {}


  async ngOnInit() {
    this.authService.authenticationState.subscribe(state => {
      this.loggedIn = state;
    });
    // this.checkLoginStatus();
    // this.listenForLoginEvents();
  }


  // checkLoginStatus() {
  //   this.authService.authenticationState.subscribe(state => {
  //     this.loggedIn = state;
  //   });
  //   // return this.userData.isLoggedIn().then(loggedIn => {
  //   //   return this.updateLoggedInStatus(loggedIn);
  //   // });
  // }

  // listenForLoginEvents() {
  //   window.addEventListener('user:login', () => {
  //     this.updateLoggedInStatus(true);
  //   });

  //   window.addEventListener('user:signup', () => {
  //     this.updateLoggedInStatus(true);
  //   });

  //   window.addEventListener('user:logout', () => {
  //     this.updateLoggedInStatus(false);
  //   });
  // }

  // updateLoggedInStatus(loggedIn: boolean) {
  //   setTimeout(() => {
  //     this.loggedIn = loggedIn;
  //   }, 300);
  // }

  farmermasterlist() {

    let cridentialparams = {
      j_username : 'jasperadmin',
      j_password : 'j^5p3r^dm1n@z7a18q'
    };
    const queryParamsString = new HttpParams({ fromObject: cridentialparams }).toString();
    const reporturl = 'reports/interactive/CustomersReport.pdf?';
    this.settingService.getItemByName("reportserver").then( item => {
      let url = item.value + "/jasperserver/rest_v2/reports/" + reporturl + queryParamsString;
      this.content = url;
    });
    // this.reportService.getFarmerMasterListReport().then(response => {
    //   console.log(response);
    // });

    // this.document.viewDocument("http://localhost:8090/jasperserver/rest_v2/reports/reports/interactive/CustomersReport.pdf?j_username=jasperadmin&j_password=jasperadmin", 'application/pdf', options);

    // this.content = "http://122.54.200.110:8060/jasperserver/rest_v2/reports/reports/samples/Cascading_multi_select_report.html?j_username=jasperadmin&j_password=j^5p3r^dm1n@z7a18q";
    // this.reportService.getFarmerMasterListReport().then(response => {
    //   let pdfBlob = new Blob([response], {type: 'application/pdf'});
    //   var fileURL = URL.createObjectURL(pdfBlob);
    //   this.content = this.domSanitizer.bypassSecurityTrustResourceUrl(fileURL);
    //   // let filePath = (this.appConfig.isNativeAndroid) ? this.file.externalRootDirectory : this.file.cacheDirectory;

    //   // //Write the file
    //   // this.file.writeFile(filePath, fileName, blob, { replace: true }).then((fileEntry: FileEntry) => {

    //   //   console.log("File created!");

    //   //   //Open with File Opener plugin
    //   //   this.fileOpener.open(fileEntry.toURL(), data.type)
    //   //     .then(() => console.log('File is opened'))
    //   //     .catch(err => console.error('Error openening file: ' + err));
    //   // })
    //   //   .catch((err) => {
    //   //     console.error("Error creating file: " + err);
    //   //     throw err;  //Rethrow - will be caught by caller
    //   //   });

    //   // this.file.writeFile(this.file.dataDirectory, "farmermasterlist.pdf", pdfBlob, {replace: true}).then(c => {
    //   //   this.document.viewDocument(this.file.dataDirectory+"farmermasterlist.pdf", "application/pdf", options);
    //   // });
    // });
  }
}
