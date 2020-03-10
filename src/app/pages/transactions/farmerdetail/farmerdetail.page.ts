import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { FarmerService } from "src/app/services/farmer.service";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";
import { FarmlocationService } from "src/app/services/farmlocation.service";
import { ToastController, AlertController } from '@ionic/angular';

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
    private alertController: AlertController
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

  deleteFarmLocation(x,item) {
    x.farmer.farmlocations = x.farmer.farmlocations.filter(o => o.objid !== item.objid);
    x.farmerService.updatefarmer(x.farmer).then(item => {
      x.showToast("Farm location removed.");
    });
  }

  deleteFarmFacility(x,item) {
    x.farmer.farmfacilities = x.farmer.farmfacilities.filter(o => o.objid !== item.objid);
    x.farmerService.updatefarmer(x.farmer).then(item => {
      x.showToast("Facility removed.");
    });
  }

  deleteAssistanceHistory(x,item) {
    x.farmer.farmerassistances = x.farmer.farmerassistances.filter(o => o.objid !== item.objid);
    x.farmerService.updatefarmer(x.farmer).then(item => {
      x.showToast("Assistance history removed.");
    });
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

  async presentAlertConfirm(item, method) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete!',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            method(this,item);
          }
        }
      ]
    });

    await alert.present();
  }
}
