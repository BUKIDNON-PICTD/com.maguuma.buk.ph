import { FormBuilder } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonList, Platform, ToastController } from "@ionic/angular";
import { SettingService } from "src/app/services/setting.service";
import { FormGroup, Validators } from "@angular/forms";
import { addCoordinateTransforms } from 'ol/proj';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  @ViewChild("itemList", { static: true }) scheduleList: IonList;
  ios: boolean;
  public items: any[] = [];
  public pagenumber: number;
  public pagesize: number;
  queryText = "";
  settingForm: FormGroup;
  validation_messages: any;
  itemselected: any;

  constructor(
    private settingService: SettingService,
    private plt: Platform,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.settingForm = this.formBuilder.group({
      objid : [''],
      name: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      value: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.required
        ])
      ]
    });

    this.validation_messages = {
      name: [
        { type: "required", message: "Name is required." },
        {
          type: "maxlength",
          message: "Name cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Your Name must contain only letters."
        }
      ],
      value: [
        { type: "required", message: "Value is required." },
        {
          type: "maxlength",
          message: "Value cannot be more than 100 characters long."
        }
      ]
    };
  }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  loadItems() {
    this.queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, " ");
    const queryWords = this.queryText.split(" ").filter(w => !!w.trim().length);

    this.settingService.getItems().then(items => {
      items.forEach(item => {
        this.filterItem(item, queryWords);
      });
      items = items.filter(i => i.hide === false);
      const sorteditems = items.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      this.items = sorteditems;
    });
  }

  filterItem(item: any, queryWords: string[]) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (item.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    item.hide = !matchesQueryText;
  }

  saveItem() {
    if (this.settingForm.valid) {
      this.settingService.getItem(this.settingForm.value).then(item => {
        if (item) {
          this.updateItem(this.settingForm.value);
        } else {
          this.addItem(this.settingForm.value);
        }
      });
    }
  }

  itemSelected(item) {
    this.settingForm.patchValue(item);
  }
  addItem(item) {
    item.objid = this.create_UUID();
    this.settingService.addItem(item).then(item => {
      this.settingForm.reset();
      this.loadItems();
      this.showToast("setting created");
    });
  }
  updateItem(item) {
    this.settingService.updateItem(item).then(item => {
      this.settingForm.reset();
      this.loadItems();
      this.showToast("setting updated");
    });
  }

  deleteItem(item) {
    this.settingService.deleteItem(item.objid).then(item => {
      this.settingForm.reset();
      this.loadItems();
      this.showToast("setting deleted");
    });
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

  create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

}
