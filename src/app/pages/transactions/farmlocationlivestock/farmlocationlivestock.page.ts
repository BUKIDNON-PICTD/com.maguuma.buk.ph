import { Component, OnInit } from "@angular/core";
import { FarmerService } from "src/app/services/farmer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MasterService } from "src/app/services/master.service";
import { Storage } from "@ionic/storage";
import { ToastController } from "@ionic/angular";
import { SettingService } from "src/app/services/setting.service";
import { FarmlocationService } from 'src/app/services/farmlocation.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: "app-farmlocationlivestock",
  templateUrl: "./farmlocationlivestock.page.html",
  styleUrls: ["./farmlocationlivestock.page.scss"]
})
export class FarmlocationlivestockPage {
  farmerid: any;
  locationid: any;
  livestockid: any;
  farmer: any;
  farmlocation: any;
  livestock: any;
  defaultHref: any;
  livestockForm: FormGroup;
  validation_messages: any;
  livestockbreeds: any[];
  livestockspecies: any[];
  surveyperiods: any[];
  viewEntered: boolean = false;
  isSubmitted: boolean = false;
  mode: string;

  constructor(
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private masterService: MasterService,
    private toastController: ToastController,
    private settingService: SettingService,
    private router: Router,
    private farmlocationService: FarmlocationService,
    private mapService: MapService
  ) {
    this.livestockForm = this.formBuilder.group({
      remarks: [""],
      seedingqty: ["", Validators.compose([Validators.required])],
      seedingdate: ["", Validators.compose([Validators.required])],
      harvestingqty: [""],
      harvestingdate: [""],
      breed: this.formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      }),
      species: this.formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      }),
      surveyperiod: this.formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      })
    });

    this.validation_messages = {
      species: [{ type: "required", message: "Species is required." }],
      breed: [{ type: "required", message: "Breed is required." }],
      surveyperiod: [
        { type: "required", message: "Survey Period is required." }
      ],
      seedingqty: [
        { type: "required", message: "Seeding Qty is required." },
        {
          type: "number",
          message: "Seeding Qty must be a number."
        }
      ],
      seedingdate: [{ type: "required", message: "Survey Period is required." }]
    };

    this.masterService.getMasterFile("master_livestock_breed").then(items => {
      this.livestockbreeds = items;
    });
    this.masterService.getMasterFile("master_livestock_species").then(items => {
      this.livestockspecies = items;
    });
    this.masterService.getMasterFile("master_surveyperiod").then(items => {
      this.surveyperiods = items;
    });

    this.mode = "create";
  }

  onSpecieChange() {
    let objid = this.livestockForm.get("species.objid").value;
    this.masterService.getMasterFile("master_livestock_breed").then(items => {
      let filtereditems = items.filter(i => i.parentid === objid);
      this.livestockbreeds = filtereditems;
    });
  }

  save() {
    this.isSubmitted = true;
    if (this.livestockForm.valid) {
      if (this.mode === "create") {
        let newitem = {
          objid: this.farmerService.create_UUID(),
          state: 'CURRENT',
          species: {},
          breed: {},
          surveyperiod: {}
        };
        newitem = {
          ...newitem,
          ...this.livestockForm.value
        };

        newitem.species = this.livestockspecies.find(
          o => o.objid === this.livestockForm.get("species.objid").value
        );
        newitem.breed = this.livestockbreeds.find(
          o => o.objid === this.livestockForm.get("breed.objid").value
        );
        newitem.surveyperiod = this.surveyperiods.find(
          o => o.objid === this.livestockForm.get("surveyperiod.objid").value
        );

        this.farmer.livestocks.push(newitem);

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Livestock Created.");
          this.livestock = item.livestocks.find(o => o.objid === newitem.objid);
          this.router.navigate([
            "app/tabs/farmerlist/farmlocationlivestock/" +
              item.objid + "/" + this.livestock.objid
          ]);
        });
      } else {
        let updateditem = {
          ...this.livestock,
          ...this.livestockForm.value
        };
        updateditem.species = this.livestockspecies.find(
          o => o.objid === this.livestockForm.get("species.objid").value
        );
        updateditem.breed = this.livestockbreeds.find(
          o => o.objid === this.livestockForm.get("breed.objid").value
        );
        updateditem.surveyperiod = this.surveyperiods.find(
          o => o.objid === this.livestockForm.get("surveyperiod.objid").value
        );

        this.farmer.livestocks = this.farmer.livestocks.map(
          livestock =>
          livestock.objid === this.livestock.objid
              ? (livestock = updateditem)
              : livestock
        );

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Livestock Updated.");
          this.livestock = item.livestocks.find(o => o.objid === this.livestock.objid);
          this.router.navigate([
            "app/tabs/farmerlist/farmlocationlivestock/" +
              item.objid + "/" + this.livestock.objid
          ]);
        });
      }
    }
  }
  unlinkLocation() {
    this.livestock.location.geolocation.features[0].properties = {};
    this.farmlocationService.updateItem(this.livestock.location.geolocation);
    this.mapService.updateItem(this.livestock.location.geolocation);

    this.livestock.location = null;
    this.farmer.livestocks = this.farmer.commodities.map(
      livestock =>
      livestock.objid === this.livestock.objid
          ? (livestock = this.livestock)
          : livestock
    );

    this.farmerService.updatefarmer(this.farmer).then(item => {
      this.showToast("Livestock Updated.");
    });
  }
  ionViewWillEnter() {
    this.farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.livestockid = this.route.snapshot.paramMap.get("livestockid");
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.defaultHref =
      `/app/tabs/farmerlist/farmerdetail/` +
      this.farmerid;

    this.farmerService.getItem(this.farmerid).then(item => {
      if (item) {
        this.farmer = item;

        this.settingService.getItemByName("surveyperiod").then(item => {
          if (item) {
            let surveyperiod = this.surveyperiods.find(
              o => o.name === item.value
            );
            this.livestockForm.patchValue({
              surveyperiod: { objid: surveyperiod.objid }
            });
          }
        });

        if (this.livestockid) {
          this.livestock = this.farmer.livestocks.find(
            i => i.objid === this.livestockid
          );
          this.livestockForm.patchValue(this.livestock);
          this.onSpecieChange();
          this.mode = 'edit';
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
