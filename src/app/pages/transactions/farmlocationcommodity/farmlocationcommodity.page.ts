import { SettingService } from "src/app/services/setting.service";
import { ToastController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { FarmerService } from "src/app/services/farmer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MasterService } from "src/app/services/master.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-farmlocationcommodity",
  templateUrl: "./farmlocationcommodity.page.html",
  styleUrls: ["./farmlocationcommodity.page.scss"]
})
export class FarmlocationcommodityPage {
  farmerid: any;
  locationid: any;
  commodityid: any;
  farmer: any;
  farmlocation: any;
  commodity: any;
  defaultHref: any;
  commodityForm: FormGroup;
  validation_messages: any;
  commodities: any[];
  commoditytypes: any[];
  surveyperiods: any[];
  viewEntered: boolean = false;
  mode: string;
  isSubmitted: boolean = false;
  varieties: any[];

  constructor(
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private masterService: MasterService,
    private toastController: ToastController,
    private settingService: SettingService,
    private router: Router
  ) {
    this.commodityForm = this.formBuilder.group({
      areasqm: ["", Validators.compose([Validators.required])],
      variety: this.formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      }),
      commoditytype: this.formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      }),
      commodity: this.formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      }),
      surveyperiod: this.formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      })
    });

    this.validation_messages = {
      variety: [{ type: "required", message: "Variety is required." }],
      commoditytype: [
        { type: "required", message: "Commodity Type is required." }
      ],
      commodity: [{ type: "required", message: "Commodity is required." }],
      surveyperiod: [
        { type: "required", message: "Survey Period is required." }
      ],
      areasqm: [
        { type: "required", message: "Area is required." },
        {
          type: "number",
          message: "Area must be a number."
        }
      ]
    };

    this.masterService.getMasterFile("master_commodity").then(items => {
      this.commodities = items;
    });
    this.masterService.getMasterFile("master_commodity_type").then(items => {
      this.commoditytypes = items;
    });
    this.masterService.getMasterFile("master_commodity_variety").then(items => {
      this.varieties = items;
    });
    this.masterService.getMasterFile("master_surveyperiod").then(items => {
      this.surveyperiods = items;
    });

    this.mode = "create";
  }

  onCommodityChange() {
    let objid = this.commodityForm.get("commodity.objid").value;
    this.masterService.getMasterFile("master_commodity_type").then(items => {
      let filtereditems = items.filter(i => i.parentid === objid);
      this.commoditytypes = filtereditems;
    });
  }

  onCommodityTypeChange() {
    let objid = this.commodityForm.get("commoditytype.objid").value;
    this.masterService.getMasterFile("master_commodity_variety").then(items => {
      let filtereditems = items.filter(i => i.parentid === objid);
      this.varieties = filtereditems;
    });
  }

  save() {
    this.isSubmitted = true;
    if (this.commodityForm.valid) {
      if (this.mode === "create") {
        let newitem = {
          objid: this.farmerService.create_UUID(),
          commodity: {},
          commoditytype: {},
          variety: {},
          surveyperiod: {}
        };
        newitem = {
          ...newitem,
          ...this.commodityForm.value
        };

        newitem.commodity = this.commodities.find(
          o => o.objid === this.commodityForm.get("commodity.objid").value
        );
        newitem.commoditytype = this.commoditytypes.find(
          o => o.objid === this.commodityForm.get("commoditytype.objid").value
        );
        newitem.variety = this.varieties.find(
          o => o.objid === this.commodityForm.get("variety.objid").value
        );
        newitem.surveyperiod = this.surveyperiods.find(
          o => o.objid === this.commodityForm.get("surveyperiod.objid").value
        );

        this.farmlocation.commodities.push(newitem);

        this.farmer.farmlocations = this.farmer.farmlocations.map(
          farmlocation =>
            farmlocation.objid === this.farmlocation.objid
              ? (farmlocation = this.farmlocation)
              : farmlocation
        );

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Commodity Created.");
          this.router.navigate([
            "/app/tabs/farmerlist/farmlocationdetail/" +
              item.objid +
              "/" +
              this.farmlocation.objid
          ]);
        });
      } else {
        let updateditem = {
          ...this.commodity,
          ...this.commodityForm.value
        };
        updateditem.commodity = this.commodities.find(
          o => o.objid === this.commodityForm.get("commodity.objid").value
        );
        updateditem.commoditytype = this.commoditytypes.find(
          o => o.objid === this.commodityForm.get("commoditytype.objid").value
        );
        updateditem.variety = this.varieties.find(
          o => o.objid === this.commodityForm.get("variety.objid").value
        );
        updateditem.surveyperiod = this.surveyperiods.find(
          o => o.objid === this.commodityForm.get("surveyperiod.objid").value
        );

        this.farmlocation.commodities = this.farmlocation.commodities.map(
          commodity =>
            commodity.objid === this.commodity.objid
              ? (commodity = updateditem)
              : commodity
        );

        this.farmer.farmlocations = this.farmer.farmlocations.map(
          farmlocation =>
            farmlocation.objid === this.farmlocation.objid
              ? (farmlocation = this.farmlocation)
              : farmlocation
        );

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Commodity Updated.");
          this.router.navigate([
            "/app/tabs/farmerlist/farmlocationdetail/" +
              item.objid +
              "/" +
              this.farmlocation.objid
          ]);
        });
      }
    }
  }

  ionViewWillEnter() {
    this.farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.locationid = this.route.snapshot.paramMap.get("locationid");
    this.commodityid = this.route.snapshot.paramMap.get("commodityid");
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.defaultHref =
      `/app/tabs/farmerlist/farmlocationdetail/` +
      this.farmerid +
      "/" +
      this.locationid;
    this.farmerService.getItem(this.farmerid).then(async item => {
      if (item) {
        this.farmer = item;

        this.settingService.getItemByName("surveyperiod").then(item => {
          if (item) {
            let surveyperiod = this.surveyperiods.find(
              o => o.name === item.value
            );
            this.commodityForm.patchValue({
              surveyperiod: { objid: surveyperiod.objid }
            });
          }
        });
        
        this.farmlocation = item.farmlocations.find(
          i => i.objid === this.locationid
        );

        if (this.commodityid) {
          this.commodity = this.farmlocation.commodities.find(
            i => i.objid === this.commodityid
          );
          this.commodityForm.patchValue(this.commodity);
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
