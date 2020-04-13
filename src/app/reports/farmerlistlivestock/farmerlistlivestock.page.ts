import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-farmerlistlivestock',
  templateUrl: './farmerlistlivestock.page.html',
  styleUrls: ['./farmerlistlivestock.page.scss'],
})
export class FarmerlistlivestockPage implements OnInit {
  reporturl: SafeResourceUrl;

  constructor(private domSanitizer: DomSanitizer,private config: AppConfigService, private authService: AuthService) { }

  ngOnInit() {
    let cridentialparams = {
      j_username : 'jasperadmin',
      j_password : 'jasperadmin',
      LGUNAME : this.config.lguname,
      OFFICENAME: "MUNICIPAL AGRICULTURE OFFICE",
      TITLE : "FARMER PROFILE LIST (LIVESTOCK)",
      USERNAME : this.authService.user.username,
      // municipality_objid: "059-22"
      // j_password : 'j^5p3r^dm1n@z7a18q'
    };
    const queryParamsString = new HttpParams({ fromObject: cridentialparams }).toString();
    this.reporturl = this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.config.reportserver}/jasperserver/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2Fmaguuma&reportUnit=%2Fmaguuma%2FFarmerList_1&standAlone=true&${queryParamsString}`);
  }

}
