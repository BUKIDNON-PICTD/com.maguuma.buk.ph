import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { FarmerService } from "src/app/services/farmer.service";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";
import { FarmlocationService } from "src/app/services/farmlocation.service";

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
    private router: Router
  ) {
    this.farmerPersonalProfileForm = this.formBuilder.group({
      is4ps: [false, Validators.compose([Validators.required])],
      isIP: [false, Validators.compose([Validators.required])],
      isFarmerAssociationMember: [
        false,
        Validators.compose([Validators.required])
      ]
    });
  }
  ionViewWillEnter() {
    const farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.farmerService.getItem(farmerid).then(item => {
      this.farmerPersonalProfileForm.patchValue(item);
      this.farmer = item;
      this.farmerPersonalProfileForm.valueChanges.subscribe(value => {
        this.farmer = {...this.farmer, ...value};
        this.farmerService.updatefarmer(this.farmer);
      });
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/farmerlist`;
  }
}
