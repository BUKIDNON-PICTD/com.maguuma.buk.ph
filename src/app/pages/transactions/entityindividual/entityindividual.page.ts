import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { Slides } from 'ionic-angular';
import { SimplePlaceholderMapper } from "@angular/compiler/src/i18n/serializers/serializer";
@Component({
  selector: "entityindividual",
  templateUrl: "./entityindividual.page.html",
  styleUrls: ["./entityindividual.page.scss"]
})
export class EntityindividualPage implements OnInit {
  @ViewChild("entityindividualSlider", { static: true }) entityindividualSlider;

  public slidePersonalInformationForm: FormGroup;
  public slidePersonalInformationDetailForm: FormGroup;
  public slideContactInformationForm: FormGroup;
  public slideAddressForm: FormGroup;
  // public submitAttempt: boolean = false;
  public isend: boolean = false;
  public isbeginning: boolean = false;
  public validation_messages: any;
  constructor(private formBuilder: FormBuilder) {


    this.slidePersonalInformationForm = formBuilder.group({
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
      gender: [
        "",
        Validators.compose([
          Validators.required
        ])
      ],
      birthdate: [
        "",
        Validators.compose([
          Validators.required
        ])
      ]
    });
    this.slidePersonalInformationDetailForm = formBuilder.group({
      birthplace: [
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
      religion: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      tin: [
        "",
        Validators.compose([
          Validators.maxLength(100)
        ])
      ],
      sss: [
        "",
        Validators.compose([
          Validators.maxLength(100)
        ])
      ],
      height: [""],
      weight: [""]
    });
    this.slideContactInformationForm = formBuilder.group({
      phoneno: [ "",
      Validators.compose([
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(10)
      ])],
      mobileno: [ "",
      Validators.compose([
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(11)
      ])],
      email: ["",
      Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])]
    });

    this.slideAddressForm = formBuilder.group({
      addresstype: [""],
      barangay_objid: [""],
      barangay_name: [""],
      city: [""],
      province: [""],
      municipality: [""],
      bldgno: [""],
      bldgname: [""],
      unitno: [""],
      street: [""],
      subdivision: [""]
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
  ngOnInit() {
    this.entityindividualSlider.lockSwipes(true);
  }

  public submit() {
    // console.log(this.entityindividualForm.value);
  }

  next() {
    if (this.slidePersonalInformationForm.valid) {
      this.entityindividualSlider.lockSwipes(false);
      this.entityindividualSlider.slideNext();
      // this.entityindividualSlider.lockSwipes(true);
      this.entityindividualSlider.lockSwipeToNext(true);
      this.entityindividualSlider.lockSwipeToPrev(false);
    }
  }

  prev() {
    this.entityindividualSlider.slidePrev();
  }

  slideChanged() {
    this.entityindividualSlider.isEnd().then(istrue => {
      this.isend = istrue;
    });
    this.entityindividualSlider.isBeginning().then(istrue => {
      this.isbeginning = istrue;
    });
  }

  slideLoad() {
    this.entityindividualSlider.isBeginning().then(istrue => {
      this.isbeginning = istrue;
    });
  }

  save() {
    console.log("Save");

    console.log(this.slidePersonalInformationForm .value);
    console.log(this.slidePersonalInformationDetailForm .value);
    console.log(this.slideContactInformationForm.value);
    console.log(this.slideAddressForm.value);
    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //     return;
    // }
    // // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }


}
