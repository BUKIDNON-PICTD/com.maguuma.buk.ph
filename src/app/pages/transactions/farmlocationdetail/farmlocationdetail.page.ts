import { FarmlocationService } from "./../../../services/farmlocation.service";
import { OlmapmodalComponent } from "./../../../components/olmapmodal/olmapmodal.component";
import { MapService } from "./../../../services/map.service";
import { SettingService } from "./../../../services/setting.service";
// import { MapPage } from "../../map/map.page";
import {
  ToastController,
  AlertController,
  ModalController
} from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FarmerService } from "src/app/services/farmer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { MasterService } from "src/app/services/master.service";
import { analyzeAndValidateNgModules } from "@angular/compiler";

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
  mapmode = "preview";
  itemid: string;
  type: string;
  commodity: any;
  livestock: any;
  location: any;
  selectedLocation: any;

  constructor(
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    private settingService: SettingService,
    private mapService: MapService,
    private farmlocationService: FarmlocationService
  ) {
    this.farmerLocationForm = this.formBuilder.group({
      areasqm: ["", Validators.compose([Validators.required])],
      farmerprofileid: [""],
      pin: [""],
      modeofacquisition: ["", Validators.compose([Validators.required])],
      barangay: formBuilder.group({
        name: [""],
        objid: ["", Validators.compose([Validators.required])]
      }),
      province: formBuilder.group({
        name: [""],
        objid: ["", Validators.compose([Validators.required])]
      }),
      municipality: formBuilder.group({
        name: [""],
        objid: ["", Validators.compose([Validators.required])]
      }),
      street: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ]
    });

    this.validation_messages = {
      areasqm: [
        { type: "required", message: "Area is required." },
        {
          type: "number",
          message: "Area must be a number."
        }
      ],
      modeofacquisition: [
        { type: "required", message: "Mode of acquisition is required." }
      ],
      barangay: [{ type: "required", message: "Barangay is required." }],
      province: [{ type: "required", message: "Province is required." }],
      municipality: [
        { type: "required", message: "Municipality is required." }
      ],
      street: [
        { type: "required", message: "Street/Purok is required." },
        {
          type: "maxlength",
          message: "Street cannot be more than 100 characters long."
        }
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
      if (this.mode === "create") {
        let newfarmlocation = {
          objid: this.farmerService.create_UUID(),
          // commodities: [],
          // livestocks: [],
          farmlocation: {
            type: "local",
            barangay: this.farmerLocationForm.controls.barangay.value,
            municipality: this.farmerLocationForm.controls.municipality.value,
            province: this.farmerLocationForm.controls.province.value,
            street: this.farmerLocationForm.controls.street.value,
            text:
              (this.farmerLocationForm.controls.street.value
                ? this.farmerLocationForm.controls.street.value + " "
                : "") +
              " " +
              this.barangays.find(
                o =>
                  o.objid ===
                  this.farmerLocationForm.get("barangay.objid").value
              ).name +
              ", " +
              this.municipalities.find(
                o =>
                  o.objid ===
                  this.farmerLocationForm.get("municipality.objid").value
              ).name +
              " " +
              this.provinces.find(
                o =>
                  o.objid ===
                  this.farmerLocationForm.get("province.objid").value
              ).name
          },
          location: {
            text: ""
          },
          barangay: this.barangays.find(
            o => o.objid === this.farmerLocationForm.get("barangay.objid").value
          )
        };

        newfarmlocation = {
          ...newfarmlocation,
          ...this.farmerLocationForm.value
        };
        newfarmlocation.location.text = newfarmlocation.farmlocation.text;

        if (this.type === "commodity") {
          this.commodity.location = newfarmlocation;
          this.farmer.commodities = this.farmer.commodities.map(commodity =>
            commodity.objid === this.commodity.objid
              ? (commodity = this.commodity)
              : commodity
          );
        } else if (this.type === "livestock") {
          this.livestock.location = newfarmlocation;
          this.farmer.livestocks = this.farmer.livestocks.map(commodity =>
            commodity.objid === this.livestock.objid
              ? (commodity = this.livestock)
              : commodity
          );
        }
        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Farm Location Created.");
          this.location =
            this.type === "commodity"
              ? this.commodity.location
              : this.livestock.location;
          this.farmlocationService.addItem(this.location);
          // if (this.type === 'commodity') {
          //   this.router.navigate([
          //     "/app/tabs/farmerlist/farmlocationcommodity/commodity/" +
          //       item.objid +
          //       "/" +
          //       this.commodity.objid
          //   ]);
          // } else {
          //   this.router.navigate([
          //     "/app/tabs/farmerlist/farmlocationlivestock/livestock/" +
          //       item.objid +
          //       "/" +
          //       this.livestock.objid
          //   ]);
          // }
        });
      } else {
        let updatedfarmlocation = {
          farmlocation: {
            type: "local",
            barangay: this.farmerLocationForm.controls.barangay.value,
            municipality: this.farmerLocationForm.controls.municipality.value,
            province: this.farmerLocationForm.controls.province.value,
            street: this.farmerLocationForm.controls.street.value,
            text:
              (this.farmerLocationForm.controls.street.value
                ? this.farmerLocationForm.controls.street.value + " "
                : "") +
              " " +
              this.barangays.find(
                o =>
                  o.objid ===
                  this.farmerLocationForm.get("barangay.objid").value
              ).name +
              ", " +
              this.municipalities.find(
                o =>
                  o.objid ===
                  this.farmerLocationForm.get("municipality.objid").value
              ).name +
              " " +
              this.provinces.find(
                o =>
                  o.objid ===
                  this.farmerLocationForm.get("province.objid").value
              ).name
          },
          location: {
            text: ""
          },
          barangay: this.barangays.find(
            o => o.objid === this.farmerLocationForm.get("barangay.objid").value
          )
        };

        updatedfarmlocation = {
          ...this.location,
          ...updatedfarmlocation,
          ...this.farmerLocationForm.value
        };
        updatedfarmlocation.location.text =
          updatedfarmlocation.farmlocation.text;

        if (this.type === "commodity") {
          this.commodity.location = updatedfarmlocation;
          this.farmer.commodities = this.farmer.commodities.map(commodity =>
            commodity.objid === this.commodity.objid
              ? (commodity = this.commodity)
              : commodity
          );
        } else if (this.type === "livestock") {
          this.livestock.location = updatedfarmlocation;
          this.farmer.livestocks = this.farmer.livestocks.map(commodity =>
            commodity.objid === this.livestock.objid
              ? (commodity = this.livestock)
              : commodity
          );
        }

        this.farmerService.updatefarmer(this.farmer).then(item => {
          this.showToast("Farm Location Updated.");
          this.location =
            this.type === "commodity"
              ? this.commodity.location
              : this.livestock.location;
          this.farmlocationService.updateItem(this.location);
          // if (this.type === 'commodity') {
          //   this.router.navigate([
          //     "/app/tabs/farmerlist/farmlocationcommodity/" +
          //       item.objid +
          //       "/" +
          //       this.commodity.objid
          //   ]);
          // } else {
          //   this.router.navigate([
          //     "/app/tabs/farmerlist/farmlocationlivestock/" +
          //       item.objid +
          //       "/" +
          //       this.livestock.objid
          //   ]);
          // }
        });
      }
    }
  }
  featureSelectedHandler(data: any) {
    this.selectedLocation = data;
  }
  claimLocation() {
    if (this.selectedLocation) {
      this.farmerService
        .getItem(this.selectedLocation.farmerid)
        .then(async prevowner => {
          if (this.selectedLocation.itemtype === "commodity") {
            let prevcomodity = prevowner.commodities.find(
              o => o.objid === this.selectedLocation.itemid
            );
            let currentsurveyperiod;
            await this.settingService
              .getItemByName("surveyperiod")
              .then(item => {
                currentsurveyperiod = item.value;
              });
            if (prevcomodity) {
              if (prevcomodity?.surveyperiod.name !== currentsurveyperiod) {
                this.commodity.location = prevcomodity.location;
              }
            } else {
              await this.farmlocationService
                .getItem(this.selectedLocation.locationid)
                .then(item => {
                  if (item) {
                    this.commodity.location = item;
                  }
                });
            }

            if (this.commodity.location.objid) {
              this.commodity.location.geolocation.features[0].properties = {
                farmerid: this.farmerid,
                itemtype: "commodity",
                itemid: this.commodity.objid
              };
              this.farmer.commodities = this.farmer.commodities.map(commodity =>
                commodity.objid === this.commodity.objid
                  ? (commodity = this.commodity)
                  : commodity
              );
              await this.mapService.updateItem(
                this.commodity.location.geolocation
              );

              await this.farmerService.updatefarmer(this.farmer).then(async item => {
                this.showToast("Farm Location Claimed.");
                this.router.navigate([
                  "/app/tabs/farmerlist/farmlocationdetail/commodity/" +
                    item.objid +
                    "/" +
                    this.livestock.objid
                ]);
              });
            } else {
              this.presentAlert(
                "You are not allowed to claim this current location? It is currently linked to " +
                  prevowner.farmer.name
              );
            }
          } else {
            let prevlivestock = prevowner.livestocks.find(
              o => o.objid === this.selectedLocation.itemid
            );
            let currentsurveyperiod;
            await this.settingService
              .getItemByName("surveyperiod")
              .then(item => {
                currentsurveyperiod = item.value;
              });

            if (prevlivestock) {
              if (prevlivestock.surveyperiod.name !== currentsurveyperiod) {
                this.livestock.location = prevlivestock.location;
              }
            } else {
              await this.farmlocationService
                .getItem(this.selectedLocation.locationid)
                .then(item => {
                  if (item) {
                    this.livestock.location = item;
                  }
                });
            }

            if (this.livestock.location.objid) {
              this.livestock.location.geolocation.features[0].properties = {
                farmerid: this.farmerid,
                itemtype: "livestock",
                itemid: this.livestock.objid
              };
              this.farmer.livestocks = this.farmer.livestocks.map(livestock =>
                livestock.objid === this.livestock.objid
                  ? (livestock = this.livestock)
                  : livestock
              );
              await this.mapService.updateItem(
                this.livestock.location.geolocation
              );

              await this.farmerService.updatefarmer(this.farmer).then(async item => {
                this.showToast("Farm Location Claimed.");
                this.router.navigate([
                  "/app/tabs/farmerlist/farmlocationdetail/livestock/" +
                    item.objid +
                    "/" +
                    this.livestock.objid
                ]);
              });
            } else {
              this.presentAlert(
                "You are not allowed to claim this current location? It is currently linked to " +
                  prevowner.farmer.name
              );
            }
          }
        });
    } else {
      this.presentAlert("Please select a location on the map frist");
    }
  }

  ionViewWillEnter() {
    this.farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.itemid = this.route.snapshot.paramMap.get("itemid");
    this.locationid = this.route.snapshot.paramMap.get("locationid");
    this.type = this.route.snapshot.paramMap.get("type");
  }

  createNewLocation() {
    this.mode = "create";
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    if (this.farmerid) {
      this.farmerService.getItem(this.farmerid).then(async item => {
        if (item) {
          this.farmer = item;
          this.farmerLocationForm.patchValue({
            province: { objid: "059" }
          });
          if (this.type === "commodity" && this.itemid) {
            this.defaultHref =
              `/app/tabs/farmerlist/farmlocationcommodity/` +
              this.farmerid +
              "/" +
              this.itemid;
            this.commodity = item.commodities.find(
              o => o.objid === this.itemid
            );
            this.location = this.commodity.location;
            if (this.location?.objid) {
              await this.masterService
                .getMasterFile("barangay")
                .then(async items => {
                  let brgy = items.find(
                    o => o.objid === this.location.barangay.objid
                  );
                  await this.farmerLocationForm.patchValue({
                    municipality: { objid: brgy.parentid }
                  });
                });
              await this.farmerLocationForm.patchValue(this.location);
              this.onProvinceChange();
              this.onMunicipalityChange();
              this.mode = "edit";
            }
          } else if (this.type === "livestock" && this.itemid) {
            this.defaultHref =
              `/app/tabs/farmerlist/farmlocationlivestock/` +
              this.farmerid +
              "/" +
              this.itemid;
            this.livestock = item.livestocks.find(o => o.objid === this.itemid);
            this.location = this.livestock.location;
            if (this.location?.objid) {
              await this.masterService
                .getMasterFile("barangay")
                .then(async items => {
                  let brgy = items.find(
                    o => o.objid === this.location.barangay.objid
                  );
                  await this.farmerLocationForm.patchValue({
                    municipality: { objid: brgy.parentid }
                  });
                });
              await this.farmerLocationForm.patchValue(this.location);
              this.onProvinceChange();
              this.onMunicipalityChange();
              this.mode = "edit";
            }
          }
        }
      });
    } else {
      this.defaultHref = `/farminventorylist`;
      this.masterService
        .getItems("agri_farmerprofile_location")
        .then(async items => {
          this.location = items.find(o => o.objid === this.locationid);
          if (this.location?.objid) {
            await this.masterService
              .getMasterFile("barangay")
              .then(async items => {
                let brgy = items.find(
                  o => o.objid === this.location.barangay.objid
                );
                await this.farmerLocationForm.patchValue({
                  municipality: { objid: brgy.parentid }
                });
              });
            await this.farmerLocationForm.patchValue(this.location);
            this.onProvinceChange();
            this.onMunicipalityChange();
            this.mode = "edit";
          }
        });
    }
  }

  // deleteFarmCommodity(x, item) {
  //   x.farmlocation.commodities = x.farmlocation.commodities.filter(
  //     o => o.objid !== item.objid
  //   );
  //   x.farmer.farmlocations = x.farmer.farmlocations.map(farmlocation =>
  //     farmlocation.objid === x.farmlocation.objid
  //       ? (farmlocation = x.farmlocation)
  //       : farmlocation
  //   );
  //   x.farmerService.updatefarmer(x.farmer).then(item => {
  //     x.showToast("Commodity removed.");
  //   });
  // }

  // deleteFarmLivestock(x, item) {
  //   x.farmlocation.livestocks = x.farmlocation.livestocks.filter(
  //     o => o.objid !== item.objid
  //   );
  //   x.farmer.farmlocations = x.farmer.farmlocations.map(farmlocation =>
  //     farmlocation.objid === x.farmlocation.objid
  //       ? (farmlocation = x.farmlocation)
  //       : farmlocation
  //   );
  //   x.farmerService.updatefarmer(x.farmer).then(item => {
  //     x.showToast("Livestock removed.");
  //   });
  // }
  async presentModal() {
    let modal = await this.modalController.create({
      component: OlmapmodalComponent,
      componentProps: {
        item: this.type === "commodity" ? this.commodity : this.livestock,
        type: this.type,
        farmerid: this.farmerid
      },
      cssClass: "modal-fullscreen"
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        this.viewEntered = true;
        if (this.type === "commodity") {
          this.defaultHref =
            `/app/tabs/farmerlist/farmlocationcommodity/` +
            this.farmerid +
            "/" +
            this.itemid;
        } else {
          this.defaultHref =
            `/app/tabs/farmerlist/farmlocationlivestock/` +
            this.farmerid +
            "/" +
            this.itemid;
        }

        this.farmerService.getItem(this.farmerid).then(async item => {
          if (item) {
            this.farmer = item;
            this.farmerLocationForm.patchValue({
              province: { objid: "059" }
            });
            if (this.type === "commodity" && this.itemid) {
              this.commodity = item.commodities.find(
                o => o.objid === this.itemid
              );
              this.location = this.commodity.location;
              await this.masterService
                .getMasterFile("barangay")
                .then(async items => {
                  let brgy = items.find(
                    o => o.objid === this.location.barangay.objid
                  );
                  await this.farmerLocationForm.patchValue({
                    municipality: { objid: brgy.parentid }
                  });
                });
              await this.farmerLocationForm.patchValue(this.location);
              this.mode = "edit";
            } else if (this.type === "livestock" && this.itemid) {
              this.livestock = item.livestocks.find(
                o => o.objid === this.itemid
              );
              this.location = this.livestock.location;
              await this.masterService
                .getMasterFile("barangay")
                .then(async items => {
                  let brgy = items.find(
                    o => o.objid === this.location.barangay.objid
                  );
                  await this.farmerLocationForm.patchValue({
                    municipality: { objid: brgy.parentid }
                  });
                });
              await this.farmerLocationForm.patchValue(this.location);
              this.mode = "edit";
            }
          }
        });
      }
    });
    return await modal.present();
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: "Alert!",
      message: message,
      buttons: [
        {
          text: "Okay"
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm(item, method) {
    const alert = await this.alertController.create({
      header: "Confirm Delete!",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Okay",
          handler: () => {
            console.log("Confirm Okay");
            method(this, item);
          }
        }
      ]
    });

    await alert.present();
  }
}
