import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { RoleService } from 'src/app/services/role.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.page.html',
  styleUrls: ['./role.page.scss'],
})
export class RolePage {
  roleForm: FormGroup;
  validation_messages: any;
  mode: string;
  isSubmitted: boolean;
  defaultHref: string;
  roleid: string;
  role: any;
  viewEntered = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private roleService: RoleService,
  ) {
    this.roleForm = this.formBuilder.group({
      name : ["", Validators.compose([Validators.required])],
      code : ["", Validators.compose([Validators.required])],
      description: ["",]
    });

    this.validation_messages = {
      name : [{ type: "required", message: "Name is required." }],
      code : [{ type: "required", message: "Code is required." }],
    };

    this.mode = "create";
  }

  save() {
    this.isSubmitted = true;
    if (this.roleForm.valid) {
      if (this.mode === "create") {
        let newitem = this.roleForm.value;

        this.roleService.addItem(newitem).then(item => {
          this.showToast("User Created.");
          this.router.navigate([
            "/rolemanagement/role/" + item.id
          ]);
        });
      } else {
        let updateditem = {
          ...this.role,
          ...this.roleForm.value
        };
        this.roleService.updateItem(updateditem).then(item => {
          this.showToast("User Updated.");
          this.router.navigate([
            "/rolemanagement/role/" + item.id
          ]);
        });
      }
    }
  }

  ionViewWillEnter() {
    this.roleid = this.route.snapshot.paramMap.get("roleid");
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.defaultHref = `/rolemanagement`;
    if (this.roleid) {
      this.roleService.getItem(this.roleid).then(item => {
        if (item) {
          this.role = item;
          this.roleForm.patchValue(this.role);
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

}
