import { Component, OnInit } from "@angular/core";
import { FarmerService } from "src/app/services/farmer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MasterService } from "src/app/services/master.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-farmfacilitydetail",
  templateUrl: "./farmfacilitydetail.page.html",
  styleUrls: ["./farmfacilitydetail.page.scss"]
})
export class FarmfacilitydetailPage {
  farmerid: string;
  viewEntered: boolean;
  defaultHref: string;
  farmer: any;
  commodities: any;
  livestocks: any;
  mode: string;
  facilityid: string;
  farmfacility: any;
  farmFacilityForm: FormGroup;
  validation_messages: any;
  facilities: any[];
  isSubmitted: boolean;

  constructor(
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.farmFacilityForm = this.formBuilder.group({
      facility: formBuilder.group({
        objid: ["", Validators.compose([Validators.required])]
      }),
      quantity: ["", Validators.compose([Validators.required])],
      modeofacquisition: ["", Validators.compose([Validators.required])]
    });

    this.validation_messages = {
      quantity: [
        { type: "required", message: "Quantity is required." },
        {
          type: "number",
          message: "Quantity must be a number."
        }
      ],
      modeofacquisition: [
        { type: "required", message: "Mode of acquisition is required." }
      ],
      facility: [{ type: "required", message: "Facility is required." }]
    };

    this.masterService.getMasterFile("master_facility").then(items => {
      this.facilities = items;
    });

    this.mode = "create";
  }
  save() {
    this.isSubmitted = true;
    if (this.farmFacilityForm.valid) {
      if (this.mode === "create") {
        let newitem = {
          objid: this.farmerService.create_UUID(),
          facility: {}
        };
        newitem = {
          ...newitem,
          ...this.farmFacilityForm.value
        };

        newitem.facility = this.facilities.find(o => o.objid === this.farmFacilityForm.get('facility.objid').value);
        this.farmer.farmfacilities.push(newitem);

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Farm Facility Created.");
          this.router.navigate([
            "/app/tabs/farmerlist/farmerdetail/" +
              item.objid
          ]);
        });
      } else {

        let updateditem = {
          ...this.farmfacility,
          ...this.farmFacilityForm.value
        };
        updateditem.facility = this.facilities.find(o => o.objid === this.farmFacilityForm.get('facility.objid').value);
        this.farmer.farmfacilities = this.farmer.farmfacilities.map(
          farmfacility =>
          farmfacility.objid === this.farmfacility.objid
              ? (farmfacility = updateditem)
              : farmfacility
        );

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Farm Facility Updated.");
          this.router.navigate([
            "/app/tabs/farmerlist/farmerdetail/" +
              item.objid
          ]);
        });
      }
    }
  }

  ionViewWillEnter() {
    this.farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.facilityid = this.route.snapshot.paramMap.get("facilityid");
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.defaultHref =
      `/app/tabs/farmerlist/farmerdetail/` + this.farmerid;
    this.farmerService.getItem(this.farmerid).then(async item => {
      if (item) {
        this.farmer = item;

        if (this.facilityid) {
          this.farmfacility = item.farmfacilities.find(
            o => o.objid === this.facilityid
          );
          await this.farmFacilityForm.patchValue(this.farmfacility);
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
