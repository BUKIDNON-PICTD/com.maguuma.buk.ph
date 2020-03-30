import { NetworkService } from 'src/app/services/network.service';
import { SettingService } from './../../services/setting.service';
import { MasterService } from './../../services/master.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})
export class IntroductionPage {
  showSkip = false;

  @ViewChild('slides', { static: true }) slides: IonSlides;
  settingsForm: FormGroup;
  validation_messages: any;
  surveyperiods: any[];
  isSubmitted: boolean = false;
  municipalities: any[];
  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private settingService: SettingService,
    private networkService: NetworkService
  ) {

    this.settingsForm = this.formBuilder.group({
      lguid: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.required
        ])
      ],
      surveyperiod: [
        "",
        Validators.compose([
          Validators.required
        ])
      ],
      syncserver: [
        "",
        Validators.compose([
          Validators.required
        ])
      ]
    });

    this.validation_messages = {
      lguid: [
        { type: "required", message: "LGU ID is required." },
        {
          type: "maxlength",
          message: "LGU ID cannot be more than 100 characters long."
        }
      ],
      surveyperiod: [
        { type: "required", message: "Survey Period is required." },
      ],
      syncserver: [
        { type: "required", message: "Survey Period is required." },
      ]
    };

    this.masterService.getMasterFile("municipality").then(items => {
      this.municipalities = items;
    });
    this.masterService.getMasterFile("master_surveyperiod").then(items => {
      this.surveyperiods = items;
    });
  }

  async startApp() {
    if (this.settingsForm.valid) {
      let clientid = {
        objid: this.create_UUID(),
        name: 'clientid',
        value: this.create_UUID(),
      };
      await this.settingService.addItem(clientid);
      let lguid = {
        objid: this.create_UUID(),
        name: 'lguid',
        value: this.settingsForm.get("lguid").value,
      };
      await this.settingService.addItem(lguid);
      let lguname = {
        objid: this.create_UUID(),
        name: 'lguname',
        value: this.municipalities.find(o => o.objid === this.settingsForm.get("lguid").value).name,
      };
      await this.settingService.addItem(lguname);
      let surveyperiod = {
        objid: this.create_UUID(),
        name: 'surveyperiod',
        value: this.settingsForm.get("surveyperiod").value,
      };
      await this.settingService.addItem(surveyperiod);

      let syncserver = {
        objid: this.create_UUID(),
        name: 'syncserver',
        value: this.settingsForm.get("syncserver").value,
      };
      await this.settingService.addItem(syncserver);
      this.networkService.initializeSocketEvents();
      this.router
      .navigateByUrl('/login', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_intro', true));
    }
  }

  create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      // this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_intro').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/about', { replaceUrl: true });
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
