import { ToastController, IonSlides } from "@ionic/angular";
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ViewChildren,
  NgZone
} from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MasterService } from "src/app/services/master.service";
import { FarmerService } from "src/app/services/farmer.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "capturefarmer",
  templateUrl: "./capturefarmer.page.html",
  styleUrls: ["./capturefarmer.page.scss"]
})
export class CapturefarmerPage implements OnInit {
  // farmProfileSlider: IonSlides;
  // @ViewChildren("farmProfileSlider", {read: any}) farmProfileSlider: IonSlides;
  // @ViewChild("farmProfileSlider", {static: false}) set ionSlides(ionSlides: IonSlides) {
  //     if (ionSlides) {
  //       this.farmProfileSlider = ionSlides;
  //     }
  // }
  // @ViewChild("farmProfileSlider") set content(content: IonSlides) {
  //   this.farmProfileSlider = content;
  //   // this.farmProfileSlider.updateAutoHeight();
  // }
  @ViewChild("farmProfileSlider", { static: false })
  protected farmProfileSlider: IonSlides;

  public farmerPersonalInformationForm: FormGroup;
  public farmerPersonalInformationDetailForm: FormGroup;
  public farmerContactInformationForm: FormGroup;
  public farmerAddressForm: FormGroup;

  // public submitAttempt: boolean = false;
  public isend: boolean = false;
  public isbeginning: boolean = false;
  public validation_messages: any;

  provinces: any[];
  municipalities: any[];
  barangays: any[];
  matches: any[];
  farmer: any;
  mode: string;
  allowsave: boolean = true;
  viewEntered: boolean = false;
  isspouse: boolean = false;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private farmerService: FarmerService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {
    this.farmerPersonalInformationForm = this.formBuilder.group({
      lastname: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      firstname: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      middlename: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      maidenname: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      nameextension: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      prenametitle: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      postnametitle: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      birthdate: ["", Validators.compose([Validators.required])],
      gender: ["", Validators.compose([Validators.required])]
    });
    this.farmerPersonalInformationDetailForm = this.formBuilder.group({
      birthplace: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      civilstatus: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      profession: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      citizenship: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      religion: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      sss: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      tin: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ]
    });
    this.farmerContactInformationForm = this.formBuilder.group({
      mobileno: [
        "",
        Validators.compose([
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(11)
        ])
      ],
      phoneno: [
        "",
        Validators.compose([
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(11)
        ])
      ],
      email: [
        "",
        Validators.compose([
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
        ])
      ]
    });
    this.farmerAddressForm = this.formBuilder.group({
      province: this.formBuilder.group({
        name: [""],
        objid: ["", Validators.compose([Validators.required])]
      }),
      municipality: this.formBuilder.group({
        name: [""],
        objid: ["", Validators.compose([Validators.required])]
      }),
      barangay: this.formBuilder.group({
        name: [""],
        objid: ["", Validators.compose([Validators.required])]
      }),
      street: [
        "",
        Validators.compose([
          Validators.maxLength(100)
        ])
      ]
    });

    // this.slidePersonalInformationForm = formBuilder.group({
    //   lastname: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*"),
    //       Validators.required
    //     ])
    //   ],
    //   firstname: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*"),
    //       Validators.required
    //     ])
    //   ],
    //   middlename: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*")
    //     ])
    //   ],
    //   maidenname: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*")
    //     ])
    //   ],
    //   nameextension: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*")
    //     ])
    //   ],
    //   prenametitle: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*")
    //     ])
    //   ],
    //   postnametitle: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*")
    //     ])
    //   ],
    //   gender: ["", Validators.compose([Validators.required])],
    //   birthdate: ["", Validators.compose([Validators.required])]
    // });
    // this.slidePersonalInformationDetailForm = formBuilder.group({
    //   birthplace: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*")
    //     ])
    //   ],
    //   citizenship: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*")
    //     ])
    //   ],
    //   civilstatus: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*")
    //     ])
    //   ],
    //   profession: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*")
    //     ])
    //   ],
    //   religion: [
    //     "",
    //     Validators.compose([
    //       Validators.maxLength(100),
    //       Validators.pattern("[a-zA-Z ]*")
    //     ])
    //   ],
    //   tin: ["", Validators.compose([Validators.maxLength(100)])],
    //   sss: ["", Validators.compose([Validators.maxLength(100)])],
    //   height: [""],
    //   weight: [""]
    // });
    // this.slideContactInformationForm = formBuilder.group({
    //   phoneno: [
    //     "",
    //     Validators.compose([
    //       Validators.pattern("^[0-9]*$"),
    //       Validators.maxLength(10)
    //     ])
    //   ],
    //   mobileno: [
    //     "",
    //     Validators.compose([
    //       Validators.pattern("^[0-9]*$"),
    //       Validators.maxLength(11)
    //     ])
    //   ],
    //   email: [
    //     "",
    //     Validators.compose([
    //       Validators.required,
    //       Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
    //     ])
    //   ]
    // });

    // this.slideAddressForm = formBuilder.group({
    //   addresstype: [""],
    //   barangay_objid: [""],
    //   barangay_name: [""],
    //   city: [""],
    //   province: [""],
    //   municipality: [""],
    //   bldgno: [""],
    //   bldgname: [""],
    //   unitno: [""],
    //   street: [""],
    //   subdivision: [""]
    // });

    this.validation_messages = {
      //personal info
      lastname: [
        { type: "required", message: "Last Name is required." },
        {
          type: "maxlength",
          message: "Last Name cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Your Last Name must contain only letters."
        }
      ],
      firstname: [
        { type: "required", message: "First Name is required." },
        {
          type: "maxlength",
          message: "First Name cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Your First Name must contain only letters."
        }
      ],
      middlename: [
        { type: "required", message: "Middle Name is required." },
        {
          type: "maxlength",
          message: "Middle Name cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Your Middle Name must contain only letters."
        }
      ],
      maidenname: [
        { type: "required", message: "Maiden Name is required." },
        {
          type: "maxlength",
          message: "Maiden Name cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Your Maiden Name must contain only letters."
        }
      ],
      nameextension: [
        {
          type: "maxlength",
          message: "Name Extension cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Name Extension Name must contain only letters."
        }
      ],
      prenametitle: [
        {
          type: "maxlength",
          message: "Pre-name Title cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Pre-name Title Name must contain only letters."
        }
      ],
      postnametitle: [
        {
          type: "maxlength",
          message: "Post-name Title cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Post-name Title must contain only letters."
        }
      ],
      //personal info details
      birthplace: [
        {
          type: "maxlength",
          message: "Brith Place cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Brith Place must contain only letters."
        }
      ],
      citizenship: [
        {
          type: "maxlength",
          message: "Citizensihp cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Citizensihp must contain only letters."
        }
      ],
      civilstatus: [
        {
          type: "maxlength",
          message: "Civil Status cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Civil Status must contain only letters."
        }
      ],
      profession: [
        {
          type: "maxlength",
          message: "Profession cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Profession must contain only letters."
        }
      ],
      religion: [
        {
          type: "maxlength",
          message: "Religion cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Religion must contain only letters."
        }
      ],
      tin: [
        {
          type: "maxlength",
          message: "Tin cannot be more than 100 characters long."
        }
      ],
      sss: [
        {
          type: "maxlength",
          message: "SSS cannot be more than 100 characters long."
        }
      ],
      height: [
        {
          type: "number",
          message: "Height must contain a number in cm."
        }
      ],
      weight: [
        {
          type: "number",
          message: "Weight must contain a number in kg."
        }
      ],
      phoneno: [
        {
          type: "maxlength",
          message: "Phone No. cannot be more than 10 characters long."
        },
        {
          type: "pattern",
          message: "Phone No. must contain only numbers."
        }
      ],
      mobileno: [
        {
          type: "maxlength",
          message: "Mobile No. cannot be more than 10 characters long."
        },
        {
          type: "pattern",
          message: "Mobile No. must contain only numbers."
        }
      ],
      email: [
        {
          type: "pattern",
          message: "Email must be valid."
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
  ngOnInit() {
    this.mode = "create";
    this.matches = [];
  }

  next() {
    this.isSubmitted = true;
    if (this.farmerPersonalInformationForm.valid) {
      if (this.mode === "create") {
        console.log("Verifing entity name.");
        this.verifyfarmername();
      }
      this.farmProfileSlider.lockSwipes(false);
      this.farmProfileSlider.slideNext();
      this.farmProfileSlider.lockSwipes(true);
      this.farmProfileSlider.lockSwipeToNext(true);
      this.farmProfileSlider.lockSwipeToPrev(false);
    } else {
      this.showToast("Form validation error.");
    }
  }

  prev() {
    this.farmProfileSlider.slidePrev();
  }

  slideChanged() {
    this.farmProfileSlider.isEnd().then(istrue => {
      this.isend = istrue;
    });
    this.farmProfileSlider.isBeginning().then(istrue => {
      this.isbeginning = istrue;
    });
  }

  slideLoad() {
    this.farmProfileSlider.update();
    this.farmProfileSlider.lockSwipes(true);
    this.farmProfileSlider.isBeginning().then(istrue => {
      this.isbeginning = istrue;
    });
  }

  verifyfarmername() {
    this.farmerService
      .verifyfarmername(this.farmerPersonalInformationForm.value)
      .then(matches => {
        if (matches) {
          this.matches = matches;
          if (this.matches[0]?.match === 100) {
            this.isend = true;
            this.allowsave = false;
          }
        }
      });
  }
  save() {
    if (
      this.farmerPersonalInformationForm.valid &&
      this.farmerAddressForm.valid &&
      this.farmerPersonalInformationDetailForm.valid &&
      this.farmerContactInformationForm.valid
    ) {
      this.farmerPersonalInformationForm.patchValue(
        this.farmerPersonalInformationDetailForm.value
      );
      this.farmerPersonalInformationForm.patchValue(
        this.farmerContactInformationForm.value
      );
      this.farmerPersonalInformationForm.patchValue({
        address: this.farmerAddressForm.value
      });
      if (this.isspouse) {
        this.savespouse();
      }
      if (this.mode === "create") {
        this.createentity();
      } else {
        this.updateentity();
      }
    } else {
      this.showToast("Form validation error.");
    }
  }

  onProvinceChange() {
    let province = this.farmerAddressForm.get("province.objid").value;
    this.masterService.getMasterFile("municipality").then(items => {
      let filtereditems = items.filter(i => i.parentid === province);
      this.municipalities = filtereditems;
    });
  }

  onMunicipalityChange() {
    let municipality = this.farmerAddressForm.get("municipality.objid").value;
    this.masterService.getMasterFile("barangay").then(items => {
      let filtereditems = items.filter(i => i.parentid === municipality);
      this.barangays = filtereditems;
    });
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

  async ionViewDidEnter() {
    this.viewEntered = true;
    const farmerid = this.route.snapshot.paramMap.get("farmerid");
    const spouseid = this.route.snapshot.paramMap.get("spouseid");
    if (farmerid) {
      this.mode = "edit";
      await this.farmerService.getItem(farmerid).then(item => {
        this.farmerPersonalInformationForm.patchValue(item);
        this.farmerPersonalInformationForm.patchValue(item.farmer);
        this.farmerPersonalInformationDetailForm.patchValue(item.farmer);
        this.farmerContactInformationForm.patchValue(item.farmer);
        this.farmerAddressForm.patchValue(item.farmer.address);
        this.farmer = item;
      });
    } else if (spouseid) {
      this.mode = "edit";
      this.isspouse = true;
      await this.farmerService.getItem(spouseid).then(item => {
        if (item.spouse) {
          this.farmerPersonalInformationForm.patchValue(item.spouse);
          this.farmerPersonalInformationDetailForm.patchValue(item.spouse);
          this.farmerContactInformationForm.patchValue(item.spouse);
          this.farmerAddressForm.patchValue(item.spouse.address);
        }
        this.farmer = item;
      });
    }
    this.farmerAddressForm.patchValue({
      province: { objid: "059" }
    });
    this.masterService.getMasterFile("barangay").then(items => {
      let brgy = items.find(
        o => o.objid === this.farmerAddressForm.get("barangay.objid").value
      );
      this.farmerAddressForm.patchValue({
        municipality: { objid: brgy.parentid }
      });
    });
  }

  createentity() {
    try {
      let farmertoadd = {
        ...this.farmerPersonalInformationForm.value,
        ...this.farmerPersonalInformationDetailForm.value,
        ...this.farmerContactInformationForm.value
      };
      farmertoadd.address = this.farmerAddressForm.value;

      let newfarmer = {
        objid: this.create_UUID(),
        fno: null,
        farmer: farmertoadd,
        postnametitle: farmertoadd.postnametitle,
        prenametitle: farmertoadd.prenametitle,
        nameextension: farmertoadd.nameextension,
        maidenname: farmertoadd.maidenname
      };

      newfarmer.farmer.objid = newfarmer.objid;
      newfarmer.fno =
        newfarmer.farmer.address.municipality.objid +
        "-TEMP-" +
        newfarmer.objid;
      newfarmer.farmer.name =
        (newfarmer.prenametitle ? newfarmer.prenametitle + " " : "") +
        newfarmer.farmer.lastname +
        ", " +
        newfarmer.farmer.firstname +
        (newfarmer.farmer.middlename ? " " + newfarmer.farmer.middlename : "") +
        (newfarmer.postnametitle ? " " + newfarmer.farmer.postnametitle : "");

      newfarmer.farmer.address.text =
        newfarmer.farmer.address.street +
        " " +
        this.barangays.find(
          o => o.objid === newfarmer.farmer.address.barangay.objid
        ).name +
        ", " +
        this.municipalities.find(
          o => o.objid === newfarmer.farmer.address.municipality.objid
        ).name +
        " " +
        this.provinces.find(
          o => o.objid === newfarmer.farmer.address.province.objid
        ).name;

      this.farmerService.addfarmer(newfarmer).then(item => {
        this.showToast("Farmer Profile Saved");
        this.router.navigate([
          "/app/tabs/farmerlist/farmerdetail/" + item.objid
        ]);
      });
    } catch (e) {
      console.log("error on save");
      this.showToast("Error in saving Farmer Profile.");
    }
  }

  updateentity() {
    try {
      if (!this.isspouse) {
        let farmerupdate = {
          ...this.farmerPersonalInformationForm.value,
          ...this.farmerPersonalInformationDetailForm.value,
          ...this.farmerContactInformationForm.value
        };
        farmerupdate.address = this.farmerAddressForm.value;
        farmerupdate.address.text =
          farmerupdate.address.street +
          " " +
          this.barangays.find(
            o => o.objid === farmerupdate.address.barangay.objid
          ).name +
          ", " +
          this.municipalities.find(
            o => o.objid === farmerupdate.address.municipality.objid
          ).name +
          " " +
          this.provinces.find(
            o => o.objid === farmerupdate.address.province.objid
          ).name;

        farmerupdate.name =
          (farmerupdate.prenametitle ? farmerupdate.prenametitle + " " : "") +
          farmerupdate.lastname +
          ", " +
          farmerupdate.firstname +
          (farmerupdate.middlename ? " " + farmerupdate.middlename : "") +
          (farmerupdate.postnametitle ? " " + farmerupdate.postnametitle : "");

        farmerupdate.objid = this.farmer.objid;
        this.farmer.farmer = farmerupdate;
        this.farmer.postnametitle = farmerupdate.postnametitle;
        this.farmer.prenametitle = farmerupdate.prenametitle;
        this.farmer.nameextension = farmerupdate.nameextension;
        this.farmer.maidenname = farmerupdate.maidenname;
      }
      console.log(this.farmer);
      this.farmerService.updatefarmer(this.farmer).then(item => {
        this.showToast("Farmer Profile Updated.");
        this.router.navigate([
          "/app/tabs/farmerlist/farmerdetail/" + item.objid
        ]);
      });
    } catch (e) {
      console.log("error on update");
      this.showToast("Error in updating Farmer Profile.");
    }
  }

  savespouse() {
    let spouseformdata = {
      ...this.farmerPersonalInformationForm.value,
      ...this.farmerPersonalInformationDetailForm.value,
      ...this.farmerContactInformationForm.value
    };
    spouseformdata.address = this.farmerAddressForm.value;

    if (!this.farmer.spouse) {
      this.farmer.spouse = {
        objid: this.create_UUID()
      };
    }
    this.farmer.spouse = {...this.farmer.spouse, ...spouseformdata};
    this.farmer.spouse.name =
      (spouseformdata.prenametitle ? spouseformdata.prenametitle + " " : "") +
      spouseformdata.lastname +
      ", " +
      spouseformdata.firstname +
      (spouseformdata.middlename
        ? " " + spouseformdata.middlename
        : "") +
      (spouseformdata.postnametitle
        ? " " + spouseformdata.postnametitle
        : "");

    this.farmer.spouse.address.text =
      spouseformdata.address.street +
      " " +
      this.barangays.find(
        o => o.objid === spouseformdata.address.barangay.objid
      ).name +
      ", " +
      this.municipalities.find(
        o => o.objid === spouseformdata.address.municipality.objid
      ).name +
      " " +
      this.provinces.find(
        o => o.objid === spouseformdata.address.province.objid
      ).name;
  }

  create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
}
