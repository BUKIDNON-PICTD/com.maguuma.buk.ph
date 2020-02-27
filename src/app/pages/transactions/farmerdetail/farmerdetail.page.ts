import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FarmerService } from "src/app/services/farmer.service";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";

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

  constructor(
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.farmerPersonalProfileForm = this.formBuilder.group({
      postnametitle: [
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
      objid: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      state: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      fno: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      nameextension: [
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
          Validators.pattern("[a-zA-Z ]*"),
        ])
      ],
      is4ps: [
        false,
        Validators.compose([
          Validators.required
        ])
      ],
      isIP: [
        false,
        Validators.compose([
          Validators.required
        ])
      ],
      isFarmerAssociationMember: [
        false,
        Validators.compose([
          Validators.required
        ])
      ],
      farmer: formBuilder.group({
        civilstatus: [
          "",
          Validators.compose([
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ])
        ],
        gender: [
          "",
          Validators.compose([
            Validators.required
          ])
        ],
        address: {
          text: [
            "",
            Validators.compose([
              Validators.maxLength(100),
              Validators.pattern("[a-zA-Z ]*"),
              Validators.required
            ])
          ],
        },
        email: [
          "",
          Validators.compose([
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ])
        ],
        phoneno: [
          "",
          Validators.compose([
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ])
        ],
        mobileno: [
          "",
          Validators.compose([
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ])
        ],
        birthplace: [
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
        lastname: [
          "",
          Validators.compose([
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ])
        ],
        citizenship: [
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
        objid: [
          "",
          Validators.compose([
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ])
        ],
        birthdate: [
          "",
          Validators.compose([
            Validators.required
          ])
        ],
        name: [
          "",
          Validators.compose([
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ])
        ],
      }),
      // farmlocations: this.formBuilder.array([])
      // ;
      // recordlog: {
      //   lastupdatedbyuserid: [
      //   "",
      //   Validators.compose([
      //     Validators.maxLength(100),
      //     Validators.pattern("[a-zA-Z ]*"),
      //     Validators.required
      //   ])
      // ],
      //   lastupdatedbyuser: [
      //   "",
      //   Validators.compose([
      //     Validators.maxLength(100),
      //     Validators.pattern("[a-zA-Z ]*"),
      //     Validators.required
      //   ])
      // ],
      //   createdbyuserid: [
      //   "",
      //   Validators.compose([
      //     Validators.maxLength(100),
      //     Validators.pattern("[a-zA-Z ]*"),
      //     Validators.required
      //   ])
      // ],
      //   createdbyuser: [
      //   "",
      //   Validators.compose([
      //     Validators.maxLength(100),
      //     Validators.pattern("[a-zA-Z ]*"),
      //     Validators.required
      //   ])
      // ],
      //   datecreated: [
      //   "",
      //   Validators.compose([
      //     Validators.maxLength(100),
      //     Validators.pattern("[a-zA-Z ]*"),
      //     Validators.required
      //   ])
      // ],
      //   dateoflastupdate: [
      //   "",
      //   Validators.compose([
      //     Validators.maxLength(100),
      //     Validators.pattern("[a-zA-Z ]*"),
      //     Validators.required
      //   ])
      // ],
      // };
    });
   
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
  }
  // get farmlocations(): FormArray {
  //   return this.farmerPersonalProfileForm.get('farmlocations') as FormArray;
  // }

  // newFarmLocation(): FormGroup {
  //   return this.formBuilder.group({
  //       areasqm: [''],
  //       farmerprofileid: [''],
  //       pin: [''],
  //       modeofacquisition: [''],
  //       objid: [''],
  //       barangay: {
  //         objid : ['']
  //       },
  //       location: {
  //         text: [''],
  //       }
  //     })
  // }

  // farmlocations(): FormGroup{
  //   return this.formBuilder.group({
  //     areasqm: [''],
  //     farmerprofileid: [''],
  //     pin: [''],
  //     modeofacquisition: [''],
  //     objid: [''],
  //     barangay: {
  //       objid : ['']
  //     },
  //     location: {
  //       text: [''],
  //     }
  //   });
  // }
  ionViewWillEnter() {
    const farmerid = this.route.snapshot.paramMap.get("farmerid");
    this.farmerService.getItem(farmerid).then(item => {
      this.farmerPersonalProfileForm.patchValue(item);
      this.farmer = item;
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/farmerlist`;
  }
}
