import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { FarmerService } from "src/app/services/farmer.service";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";
import { FarmlocationService } from "src/app/services/farmlocation.service";
import { ToastController } from '@ionic/angular';

@Component({
  selector: "app-farmerdetail",
  templateUrl: "./farmerdetail.page.html",
  styleUrls: ["./farmerdetail.page.scss"]
})
export class FarmerdetailPage {
  defaultHref: any;
  farmer: any;
  farmerPersonalProfileForm: FormGroup;
  validation_messages: any;
  farmlocations: any;

  constructor(
    private farmerService: FarmerService,
    private farmlocationService: FarmlocationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
  ) {
    this.farmerPersonalProfileForm = this.formBuilder.group({
      is4ps: [false, Validators.compose([Validators.required])],
      isIP: [false, Validators.compose([Validators.required])],
      isFarmerAssociationMember: [
        false,
        Validators.compose([Validators.required])
      ]
    });
    this.farmerPersonalProfileForm.valueChanges.subscribe(value => {
      this.farmer = {...this.farmer, ...value};
      this.farmerService.updatefarmer(this.farmer);
    });
  }
  ionViewWillEnter() {
    const farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.farmerService.getItem(farmerid).then(item => {
      this.farmer = item;
      this.farmerPersonalProfileForm.patchValue(item, {emitEvent: false});
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/farmerlist`;
  }

  deleteFarmLocation(item) {
    this.farmer.farmlocations = this.farmer.farmlocations.filter(o => o.objid !== item.objid);
    this.farmerService.updatefarmer(this.farmer).then(item => {
      this.showToast("Assistance history removed.");
    });
  }

  deleteFarmFacility(item) {
    this.farmer.farmfacilities = this.farmer.farmfacilities.filter(o => o.objid !== item.objid);
    this.farmerService.updatefarmer(this.farmer).then(item => {
      this.showToast("Facility removed.");
    });
  }

  deleteAssistanceHistory(item) {
    this.farmer.farmerassistances = this.farmer.farmerassistances.filter(o => o.objid !== item.objid);
    this.farmerService.updatefarmer(this.farmer).then(item => {
      this.showToast("Assistance history removed.");
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
