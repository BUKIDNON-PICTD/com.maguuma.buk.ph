import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerassistancedetailPageRoutingModule } from './farmerassistancedetail-routing.module';

import { FarmerassistancedetailPage } from './farmerassistancedetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerassistancedetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FarmerassistancedetailPage]
})
export class FarmerassistancedetailPageModule {}
