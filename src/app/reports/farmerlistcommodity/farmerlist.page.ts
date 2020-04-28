import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-farmerlist',
  templateUrl: './farmerlist.page.html',
  styleUrls: ['./farmerlist.page.scss'],
})
export class FarmerlistPage implements OnInit {
  reporturl: SafeResourceUrl;

  constructor(private domSanitizer: DomSanitizer,private config: AppConfigService, private authService: AuthService) { }

  ngOnInit() {
    let cridentialparams = {
      j_username : 'jasperadmin',
      j_password : 'j^5p3r^dm1n@z7a18q',
      LGUNAME : this.config.lguname,
      OFFICENAME: "MUNICIPAL AGRICULTURE OFFICE",
      TITLE : "FARMER PROFILE LIST (COMMODITY)",
      USERNAME : this.authService.user.username,
      // municipality_objid: "059-22"
      // j_password : 'j^5p3r^dm1n@z7a18q'
    };
    const queryParamsString = new HttpParams({ fromObject: cridentialparams }).toString();
    this.reporturl = this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.config.reportserver}/jasperserver/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2Fmaguuma&reportUnit=%2Fmaguuma%2FFarmerList&standAlone=true&${queryParamsString}`);
  }

}
