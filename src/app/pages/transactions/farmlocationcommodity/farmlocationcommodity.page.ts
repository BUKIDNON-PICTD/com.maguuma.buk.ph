import { Component, OnInit } from "@angular/core";
import { FarmerService } from "src/app/services/farmer.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
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
  commodityvarieties: any[];
  surveyperiods: any[];

  constructor(
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private masterService: MasterService
  ) {
    this.commodityForm = this.formBuilder.group({
      areasqm: [''],
      locationid: [''],
      objid: [''],
      variety: this.formBuilder.group({
        name: [''],
        description: [''],
        objid: [''],
        code: [''],
        commoditytype: this.formBuilder.group({
          objid: [''],
          unit: [''],
          name: [''],
          code: [''],
          description: ['']
        }),
        commodity: this.formBuilder.group({
          name: [''],
          description: [''],
          code: [''],
          objid: ['']
        }),
      }),
      surveyperiod: this.formBuilder.group({
        code: [''],
        end: [''],
        objid: [''],
        description: [''],
        name: [''],
        start: ['']
      }),
      commoditytype: this.formBuilder.group({
        objid: ['']
      })
    });

    this.validation_messages = {
      areasqm: [""],
      locationid: [""],
      objid: [""],
      variety: {
        name: [""],
        commoditytype: [""],
        description: [""],
        objid: [""],
        code: [""]
      },
      surveyperiod: {
        code: [""],
        end: [""],
        objid: [""],
        description: [""],
        name: [""]
      },
      commoditytype: {
        objid: [""]
      },
      commodity: {
        objid: ['']
      }
    };

    this.masterService.getMasterFile("master_commodity").then(items => {
      this.commodities = items;
    });
    this.masterService.getMasterFile("master_commodity_type").then(items => {
      this.commoditytypes = items;
    });
    this.masterService.getMasterFile("master_commodity_variety").then(items => {
      this.commodityvarieties = items;
    });
    this.masterService.getMasterFile("master_surveyperiod").then(items => {
      this.surveyperiods = items;
    });

  }

  onCommodityChange() {

  }

  onCommodityTypeChange() {

  }

  onVarietyChange() {

  }

  ionViewWillEnter() {
    this.farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.locationid = this.route.snapshot.paramMap.get("locationid");
    this.commodityid = this.route.snapshot.paramMap.get("commodityid");
  }

  ionViewDidEnter() {
    this.defaultHref =
      `/app/tabs/farmerlist/farmlocationdetail/` +
      this.farmerid +
      "/" +
      this.locationid;
    this.farmerService.getItem(this.farmerid).then(item => {
      if (item) {
        this.farmer = item;
        this.farmlocation = item.farmlocations.find(
          i => i.objid === this.locationid
        );
        this.commodity = this.farmlocation.commodities.find(
          i => i.objid === this.commodityid
        );
        this.commodityForm.patchValue(this.commodity);
      }
    });
  }
}
