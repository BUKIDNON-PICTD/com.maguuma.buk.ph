import { ToastController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FarmerService } from "src/app/services/farmer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { FarmlocationService } from "src/app/services/farmlocation.service";
import { MasterService } from 'src/app/services/master.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: "app-farmlocationdetail",
  templateUrl: "./farmlocationdetail.page.html",
  styleUrls: ["./farmlocationdetail.page.scss"]
})
export class FarmlocationdetailPage {
  defaultHref: any;
  farmlocation: any;
  farmerid: any;
  locationid: any;
  farmer: any;
  farmerLocationForm: FormGroup;
  validation_messages: any;
  provinces: any[];
  municipalities: any[];
  barangays: any[];
  assistances: any;
  mode: string;
  viewEntered: boolean = false;
  isSubmitted: boolean = false;

  constructor(
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
  ) {
    this.farmerLocationForm = this.formBuilder.group({
      areasqm: [
        "",
        Validators.compose([
          Validators.required
        ])
      ],
      farmerprofileid: [""],
      pin: [""],
      modeofacquisition: ["", Validators.compose([Validators.required])],
      barangay: formBuilder.group({
        name: [""],
        objid:  ["", Validators.compose([Validators.required])],
      }),
      province: formBuilder.group({
        name: [""],
        objid:  ["", Validators.compose([Validators.required])],
      }),
      municipality: formBuilder.group({
        name: [""],
        objid:  ["", Validators.compose([Validators.required])],
      }),
      street: ["", Validators.compose([Validators.maxLength(100)])]
    });

    this.validation_messages = {
      areasqm: [
        { type: "required", message: "Area is required." },
        {
          type: "number",
          message: "Area must be a number."
        }
      ],
      modeofacquisition: [{ type: "required", message: "Mode of acquisition is required." }],
      barangay: [{ type: "required", message: "Barangay is required." }],
      province: [{ type: "required", message: "Province is required." }],
      municipality: [{ type: "required", message: "Municipality is required." }],
      street: [
        { type: "maxlength", message: "Street cannot be more than 100 characters long."},
      ]
    };

    this.masterService.getMasterFile("province").then(items => {
      this.provinces = items;
    });

    this.masterService.getMasterFile("municipality").then(items => {
      this.municipalities = items;
    });

    this.masterService.getMasterFile("barangay").then(items => {
      this.barangays = items;
    });
    this.mode = 'create';
  }

  onProvinceChange() {
    let province = this.farmerLocationForm.get("province.objid").value;
    this.masterService.getMasterFile("municipality").then(items => {
      let filtereditems = items.filter(i => i.parentid === province);
      this.municipalities = filtereditems;
    });
  }

  onMunicipalityChange() {
    let municipality = this.farmerLocationForm.get("municipality.objid").value;
    this.masterService.getMasterFile("barangay").then(items => {
      let filtereditems = items.filter(i => i.parentid === municipality);
      this.barangays = filtereditems;
    });
  }

  save() {
    this.isSubmitted = true;
    if (this.farmerLocationForm.valid) {
      if (this.mode === 'create') {
        let newfarmlocation = {
          objid : this.farmerService.create_UUID(),
          commodities: [],
          livestocks: [],
          farmlocation : {
            type: "local",
            barangay : this.farmerLocationForm.controls.barangay.value,
            municipality: this.farmerLocationForm.controls.municipality.value,
            province: this.farmerLocationForm.controls.province.value,
            street: this.farmerLocationForm.controls.street.value,
            text : (this.farmerLocationForm.controls.street.value ? this.farmerLocationForm.controls.street.value + " " : "") +
            " " +
            this.barangays.find(
              o => o.objid === this.farmerLocationForm.get('barangay.objid').value
            ).name +
            ", " +
            this.municipalities.find(
              o => o.objid === this.farmerLocationForm.get('municipality.objid').value
            ).name +
            " " +
            this.provinces.find(
              o => o.objid === this.farmerLocationForm.get('province.objid').value
            ).name,
          },
          location: {
            text : ""
          },
          barangay: this.barangays.find(
            o => o.objid === this.farmerLocationForm.get('barangay.objid').value
          )

        };

        newfarmlocation = {...newfarmlocation, ...this.farmerLocationForm.value};
        newfarmlocation.location.text = newfarmlocation.farmlocation.text;
        this.farmer.farmlocations.push(newfarmlocation);

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Farm Location Created.");
          this.router.navigate([
            "/app/tabs/farmerlist/farmlocationdetail/" + item.objid + "/" + newfarmlocation.objid
          ]);
        });
      } else {


        let updatedfarmlocation = {
          farmlocation : {
            type: "local",
            barangay : this.farmerLocationForm.controls.barangay.value,
            municipality: this.farmerLocationForm.controls.municipality.value,
            province: this.farmerLocationForm.controls.province.value,
            street: this.farmerLocationForm.controls.street.value,
            text : (this.farmerLocationForm.controls.street.value ? this.farmerLocationForm.controls.street.value + " " : "") +
            " " +
            this.barangays.find(
              o => o.objid === this.farmerLocationForm.get('barangay.objid').value
            ).name +
            ", " +
            this.municipalities.find(
              o => o.objid === this.farmerLocationForm.get('municipality.objid').value
            ).name +
            " " +
            this.provinces.find(
              o => o.objid === this.farmerLocationForm.get('province.objid').value
            ).name,
          },
          location: {
            text : ""
          },
          barangay: this.barangays.find(
            o => o.objid === this.farmerLocationForm.get('barangay.objid').value
          )
        };

        updatedfarmlocation = {...this.farmlocation, ...updatedfarmlocation, ...this.farmerLocationForm.value};
        updatedfarmlocation.location.text = updatedfarmlocation.farmlocation.text;
     
        this.farmer.farmlocations = this.farmer.farmlocations.map(farmlocation =>
          farmlocation.objid === this.farmlocation.objid
            ? farmlocation = updatedfarmlocation
            : farmlocation
        );

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Farm Location Updated.");
          this.router.navigate([
            "/app/tabs/farmerlist/farmlocationdetail/" + item.objid + "/" + this.farmlocation.objid
          ]);
        });
      }
    }
  }

  ionViewWillEnter() {
    this.farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.locationid = this.route.snapshot.paramMap.get("locationid");
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.defaultHref = `/app/tabs/farmerlist/farmerdetail/` + this.farmerid;
    this.farmerService.getItem(this.farmerid).then(async item => {
      if (item) {
        this.farmer = item;
        this.farmerLocationForm.patchValue({
          province: { objid: "059" }
        });
        if (this.locationid) {
          this.farmlocation = item.farmlocations.find(o => o.objid === this.locationid);
          await this.masterService.getMasterFile("barangay").then(async items => {
            let brgy = items.find(o => o.objid === this.farmlocation.barangay.objid);
            await this.farmerLocationForm.patchValue({
              municipality: { objid: brgy.parentid }
            });
          });
          await this.farmerLocationForm.patchValue(this.farmlocation);
       
          this.mode = 'edit';
        }
      }
    });
  }

  deleteFarmCommodity(x,item) {
    x.farmlocation.commodities = x.farmlocation.commodities.filter( o => o.objid !== item.objid);
    x.farmer.farmlocations = x.farmer.farmlocations.map(
      farmlocation =>
      farmlocation.objid === x.farmlocation.objid
          ? (farmlocation = x.farmlocation)
          : farmlocation
    );
    x.farmerService.updatefarmer(x.farmer).then(item => {
      x.showToast("Commodity removed.");
    });
  }

  deleteFarmLivestock(x,item) {
    x.farmlocation.livestocks = x.farmlocation.livestocks.filter( o => o.objid !== item.objid);
    x.farmer.farmlocations = x.farmer.farmlocations.map(
      farmlocation =>
      farmlocation.objid === x.farmlocation.objid
          ? (farmlocation = x.farmlocation)
          : farmlocation
    );
    x.farmerService.updatefarmer(x.farmer).then(item => {
      x.showToast("Livestock removed.");
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
