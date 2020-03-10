import { SettingService } from 'src/app/services/setting.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { FarmerService } from 'src/app/services/farmer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: "app-farmerassistancedetail",
  templateUrl: "./farmerassistancedetail.page.html",
  styleUrls: ["./farmerassistancedetail.page.scss"]
})
export class FarmerassistancedetailPage {
  farmerAssistanceForm: FormGroup;
  validation_messages: any;
  assistanceclassifications: any;
  mode: string;
  assistancetypes: any;
  isSubmitted: boolean;
  farmerid: any;
  assistanceid: any;
  viewEntered: boolean;
  defaultHref: string;
  farmer: any;
  farmerassistances: any;
  farmerassistance: any;
  surveyperiods: any[];
  constructor(
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastController: ToastController,
    private router: Router,
    private settingService: SettingService,
  ) {
    this.farmerAssistanceForm = this.formBuilder.group({
      assistanceclassification : formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      }),
      assistancetype : formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      }),
      qty: ["", Validators.compose([Validators.required])],
      txndate: ["", Validators.compose([Validators.required])],
      remarks: [""],
      surveyperiod : formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      }),
    });

    this.validation_messages = {
      assistanceclassification: [{ type: "required", message: "Assistance Classification is required." }],
      assistancetype: [{ type: "required", message: "Assistance Type is required." }],
      surveyperiod: [{ type: "required", message: "Survey Period is required." }],
      qty: [
        { type: "required", message: "Quantity is required." },
        {
          type: "number",
          message: "Quantity must be a number."
        }
      ],
      txndate: [
        { type: "required", message: "Transaction Date is required." }
      ]
    };

    this.masterService.getMasterFile("master_assistance_classification").then(items => {
      this.assistanceclassifications = items;
    });

    this.masterService.getMasterFile("master_assistance_type").then(items => {
      this.assistancetypes = items;
    });

    this.masterService.getMasterFile("master_surveyperiod").then(items => {
      this.surveyperiods = items;
    });

    this.mode = "create";
  }

  onAssistanceClassificationChange() {
    let objid = this.farmerAssistanceForm.get("assistanceclassification.objid").value;
    this.masterService.getMasterFile("master_assistance_type").then(items => {
      let filtereditems = items.filter(i => i.parentid === objid);
      this.assistancetypes = filtereditems;
    });
  }
  save() {
    this.isSubmitted = true;
    if (this.farmerAssistanceForm.valid) {
      if (this.mode === "create") {
        let newitem = {
          objid: this.farmerService.create_UUID(),
          assistancetype: {},
          assistanceclassification: {},
          surveyperiod: {}
        };
        newitem = {
          ...newitem,
          ...this.farmerAssistanceForm.value
        };

        newitem.assistancetype = this.assistancetypes.find(
          o => o.objid === this.farmerAssistanceForm.get("assistancetype.objid").value
        );
        newitem.assistanceclassification = this.assistanceclassifications.find(
          o => o.objid === this.farmerAssistanceForm.get("assistanceclassification.objid").value
        );
        newitem.surveyperiod = this.surveyperiods.find(
          o => o.objid === this.farmerAssistanceForm.get("surveyperiod.objid").value
        );
        this.farmer.farmerassistances.push(newitem);

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Assistance History Created.");
          this.router.navigate([
            "/app/tabs/farmerlist/farmerdetail/" + item.objid
          ]);
        });
      } else {
        let updateditem = {
          ...this.farmerassistance,
          ...this.farmerAssistanceForm.value
        };
        updateditem.assistancetype = this.assistancetypes.find(
          o => o.objid === this.farmerAssistanceForm.get("assistancetype.objid").value
        );
        updateditem.assistanceclassification = this.assistanceclassifications.find(
          o => o.objid === this.farmerAssistanceForm.get("assistanceclassification.objid").value
        );
        updateditem.surveyperiod = this.surveyperiods.find(
          o => o.objid === this.farmerAssistanceForm.get("surveyperiod.objid").value
        );
        this.farmer.farmerassistances = this.farmer.farmerassistances.map(
          assistance =>
          assistance.objid === this.farmerassistance.objid
              ? (assistance = updateditem)
              : assistance
        );

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Assistance History Updated.");
          this.router.navigate([
            "/app/tabs/farmerlist/farmerdetail/" + item.objid
          ]);
        });
      }
    }
  }

  ionViewWillEnter() {
    this.farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.assistanceid = this.route.snapshot.paramMap.get("assistanceid");
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.defaultHref = `/app/tabs/farmerlist/farmerdetail/` + this.farmerid;
    this.farmerService.getItem(this.farmerid).then(async item => {
      if (item) {
        this.farmer = item;

        this.settingService.getItemByName('surveyperiod').then( item => {
          if (item) {
            let surveyperiod = this.surveyperiods.find(o => o.name === item.value);
            this.farmerAssistanceForm.patchValue({
              surveyperiod: { objid: surveyperiod.objid }
            });
          }
        });

        if (this.assistanceid) {
          this.farmerassistance = item.farmerassistances.find(
            o => o.objid === this.assistanceid
          );
          await this.farmerAssistanceForm.patchValue(this.farmerassistance);
          this.mode = "edit";
        }
      }
    });
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }
}
