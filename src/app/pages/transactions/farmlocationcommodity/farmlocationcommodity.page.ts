import { MapService } from './../../../services/map.service';
import { FarmlocationService } from './../../../services/farmlocation.service';
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
  unitofmeasure: any =  'AREA';

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
    this.commodityForm = this.formBuilder.group({
      quantity: ["", Validators.compose([Validators.required])],
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
      quantity: [
        { type: "required", message: "Quantity is required." },
        {
          type: "number",
          message: "Quantity must be a number."
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

    this.unitofmeasure = this.commoditytypes.find(o => o.objid === objid).unit;
  }

  save() {
    this.isSubmitted = true;
    if (this.commodityForm.valid) {
      if (this.mode === "create") {
        let newitem = {
          objid: this.farmerService.create_UUID(),
          state: 'CURRENT',
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

        this.farmer.commodities.push(newitem);


        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Commodity Created.");
          this.commodity = item.commodities.find(o => o.objid === newitem.objid);
          this.router.navigate([
            "app/tabs/farmerlist/farmlocationcommodity/" +
              item.objid + "/" + this.commodity.objid
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


        this.farmer.commodities = this.farmer.commodities.map(
          commodity =>
            commodity.objid === this.commodity.objid
              ? (commodity = updateditem)
              : commodity
        );

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Commodity Updated.");
          this.commodity = item.commodities.find(o => o.objid === this.commodity.objid);
          this.router.navigate([
            "app/tabs/farmerlist/farmlocationcommodity/" +
              item.objid + "/" + this.commodity.objid
          ]);
        });
      }
    }
  }
  unlinkLocation() {
    this.commodity.location.geolocation.features[0].properties = {};
    this.farmlocationService.updateItem(this.commodity.location.geolocation);
    this.mapService.updateItem(this.commodity.location.geolocation);

    this.commodity.location = null;
    this.farmer.commodities = this.farmer.commodities.map(
      commodity =>
        commodity.objid === this.commodity.objid
          ? (commodity = this.commodity)
          : commodity
    );

    this.farmerService.updatefarmer(this.farmer).then(item => {
      this.showToast("Commodity Updated.");
    });
  }
  ionViewWillEnter() {
    this.farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.commodityid = this.route.snapshot.paramMap.get("commodityid");
  }

  async ionViewDidEnter() {
    this.viewEntered = true;
    this.defaultHref =
      `/app/tabs/farmerlist/farmerdetail/` +
      this.farmerid;
    await this.farmerService.getItem(this.farmerid).then(async item => {
      if (item) {
        this.farmer = item;

        await this.settingService.getItemByName("surveyperiod").then(item => {
          if (item) {
            let surveyperiod = this.surveyperiods.find(
              o => o.name === item.value
            );
            this.commodityForm.patchValue({
              surveyperiod: { objid: surveyperiod.objid }
            });
          }
        });

        // this.farmlocation = item.farmlocations.find(
        //   i => i.objid === this.locationid
        // );

        if (this.commodityid) {

          this.commodity = this.farmer.commodities.find(
            i => i.objid === this.commodityid
          );
          await this.masterService.getMasterFile("master_commodity_variety").then(items => {
            let item = items.find(
              o => o.objid === this.commodity.variety.objid
            );
            this.commodity.commoditytype = {objid: item.parentid};
          });

          await this.masterService.getMasterFile("master_commodity_type").then(items => {
            let item = items.find(
              o => o.objid === this.commodity.commoditytype.objid
            );
            this.commodity.commodity = {objid: item.parentid};
          });

          await this.commodityForm.patchValue(this.commodity);

          this.onCommodityChange();
          this.onCommodityTypeChange();
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
