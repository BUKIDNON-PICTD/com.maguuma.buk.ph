import { Component, OnInit } from "@angular/core";
import { FarmerService } from "src/app/services/farmer.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MasterService } from "src/app/services/master.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-farmlocationlivestock',
  templateUrl: './farmlocationlivestock.page.html',
  styleUrls: ['./farmlocationlivestock.page.scss'],
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
  
  constructor(
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private masterService: MasterService
  ) {
    this.livestockForm = this.formBuilder.group({
      harvestingdate: [''],
      remark: [''],
      seedingqty: [''],
      locationid: [''],
      seedingdate: [''],
      objid: [''],
      harvestingqty: [''],
      breed: this.formBuilder.group({
        name: [''],
        code: [''],
        objid: [''],
        description: [''],
        species: this.formBuilder.group({
          objid: [''],
          description: [''],
          unit: [''],
          code: [''],
          name: [''],
        }),
      }),
      species: this.formBuilder.group({
        objid: "CTYP1902cfc:158a9366fde:-7925"
      }),
      surveyperiod: this.formBuilder.group({
        code: [''],
        end: [''],
        objid: [''],
        description: [''],
        name: [''],
        start: ['']
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

    this.masterService.getMasterFile("master_livestock_breed").then(items => {
      this.livestockbreeds = items;
    });
    this.masterService.getMasterFile("master_livestock_species").then(items => {
      this.livestockspecies = items;
    });
    this.masterService.getMasterFile("master_surveyperiod").then(items => {
      this.surveyperiods = items;
    });
  }

  onBreedChange() {

  }

  onSpecieChange() {

  }

  ionViewWillEnter() {
    this.farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.locationid = this.route.snapshot.paramMap.get("locationid");
    this.livestockid = this.route.snapshot.paramMap.get("livestockid");
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
        this.livestock = this.farmlocation.livestocks.find(
          i => i.objid === this.livestockid
        );
        this.livestockForm.patchValue(this.livestock);
      }
    });
  }

}
