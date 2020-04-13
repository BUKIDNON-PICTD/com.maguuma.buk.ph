import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from './../../../services/role.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  userForm: FormGroup;
  validation_messages: any;
  mode: string;
  isSubmitted: boolean;
  defaultHref: string;
  roles: any[];
  userid: string;
  user: any;
  viewEntered = false;
  confirmpassword: any;
  password: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private roleService: RoleService,
    private alertController: AlertController,
    private authService: AuthService
  ) {
    this.userForm = this.formBuilder.group({
      lastname : ["", Validators.compose([Validators.required])],
      firstname : ["", Validators.compose([Validators.required])],
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      passwordConfirm: ["", Validators.compose([Validators.required])],
      roleid : ["", Validators.compose([Validators.required])]
    }, {validator: this.pwdConfirming('password', 'passwordConfirm')});

    this.validation_messages = {
      lastname : [{ type: "required", message: "Last Name is required." }],
      firstname : [{ type: "required", message: "First Name is required." }],
      username : [{ type: "required", message: "Username is required." }],
      password : [{ type: "required", message: "Password is required." }],
      passwordConfirm : [
        { type: "required", message: "Password is required." },
        { type: "notEquivalent", message: "Password dose not match." },
      ],
      roleid : [{ type: "required", message: "Role is required." }],
    };

    this.roleService.getItems().then( roles => {
      this.roles = roles;
    });

    this.mode = "create";
  }

  save() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      if (this.mode === "create") {
        let newitem = this.userForm.value;

        this.userService.addItem(newitem).then(item => {
          this.showToast("User Created.");
          this.router.navigate([
            "/usermanagement/user/" + item.id
          ]);
        });
      } else {
        let updateditem = {
          ...this.user,
          ...this.userForm.value
        };
        this.userService.updateItem(updateditem).then(item => {
          this.showToast("User Updated.");
          this.router.navigate([
            "/usermanagement/user/" + item.id
          ]);
        });
      }
    }
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {

            if (data.password !== data.confirmpassword) {
                alert.setAttribute('message', 'Password must match.');
                return false;
            } else {
                data.username = this.user.username;
                this.authService.changepassword(data).subscribe( res => {
                  // this.authService.login(data).subscribe();
                  return true;
                });
                // alert.setAttribute('message', 'Password updated.');
                // return true;
            }

            // this.userData.setUsername(data.username);
            // this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'password',
          name: 'password',
          value: this.password,
          placeholder: 'password'
        },
        {
          type: 'password',
          name: 'confirmpassword',
          value: this.confirmpassword,
          placeholder: 'confirm password'
        }
      ]
    });
    await alert.present();
  }

  ionViewWillEnter() {
    this.userid = this.route.snapshot.paramMap.get("userid");
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.defaultHref = `/usermanagement`;
    if (this.userid) {
      this.userService.getItem(this.userid).then(item => {
        if (item) {
          this.user = item;
          this.userForm = this.formBuilder.group({
            lastname : ["", Validators.compose([Validators.required])],
            firstname : ["", Validators.compose([Validators.required])],
            username: ["", Validators.compose([Validators.required])],
            roleid : ["", Validators.compose([Validators.required])]
          });
          this.userForm.patchValue(this.user);
          this.mode = "edit";
        }
      });
    }

  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

  pwdConfirming(key: string, confirmationKey: string) {
    return (group: FormGroup) => {
        const input = group.controls[key];
        const confirmationInput = group.controls[confirmationKey];
        return confirmationInput.setErrors(
            input.value !== confirmationInput.value ? {notEquivalent: true} : null
        );
    };
}
}
