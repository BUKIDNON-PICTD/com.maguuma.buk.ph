import { FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FarmerService } from "src/app/services/farmer.service";
import { ActivatedRoute } from "@angular/router";
import { Storage } from '@ionic/storage';
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

  constructor(
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage: Storage
  ) {
    this.farmerLocationForm = this.formBuilder.group({
      areasqm: [""],
      farmerprofileid: [""],
      pin: [""],
      modeofacquisition: [""],
      objid: [""],
      location: formBuilder.group({
        text: ['']
      }),
      barangay: formBuilder.group({
        objid: ['']
      }),
      province: formBuilder.group({
        objid: ['']
      }),
      municipality: formBuilder.group({
        objid: ['']
      }),
      street: [''],
  
    });

    this.validation_messages = {
      areasqm: [""],
      farmerprofileid: [""],
      pin: [""],
      modeofacquisition: [""],
      objid: [""],
      location: {
        text: [""]
      },
      barangay: [""],
      city: [""],
      province: [""],
      municipality: [""],
      street: [""]
    };

    this.storage.get('province').then(items => {
      this.provinces = items;
    });

    this.storage.get('municipality').then(items => {
      this.municipalities = items;
    });

    this.storage.get('barangay').then(items => {
      this.barangays = items;
    });

  }

  onProvinceChange() {
    let province = this.farmerLocationForm.get('province.objid').value;
    this.storage.get('municipality').then(items => {
      let filtereditems = items.filter(
        i => i.parentid === province
      );
      this.municipalities = filtereditems;
    });
  }

  onMunicipalityChange() {
    let municipality = this.farmerLocationForm.get('municipality.objid').value;
    this.storage.get('barangay').then(items => {
      let filtereditems = items.filter(
        i => i.parentid === municipality
      );
      this.barangays = filtereditems;
    });
  }

  ionViewWillEnter() {
    this.farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.locationid = this.route.snapshot.paramMap.get("locationid");
    
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/farmerlist/farmerdetail/` + this.farmerid;
    this.farmerService.getItem(this.farmerid).then(item => {
      if (item) {
        let farmlocation = item.farmlocations.find(
          i => i.objid === this.locationid
        );
        this.farmlocation = farmlocation;
        this.farmer = item;

        this.farmerLocationForm.patchValue({
          province :
          {objid : '059'}
        });
        this.storage.get('barangay').then(items => {
          let brgy = items.find(o => o.objid == farmlocation.barangay.objid);
          this.farmerLocationForm.patchValue({
            municipality :
            {objid : brgy.parentid}
          });
        });
        
        this.farmerLocationForm.patchValue(farmlocation);
      }
    });
  }
}
