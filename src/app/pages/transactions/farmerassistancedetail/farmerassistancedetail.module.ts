import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerassistancedetailPageRoutingModule } from './farmerassistancedetail-routing.module';

import { FarmerassistancedetailPage } from './farmerassistancedetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerassistancedetailPageRoutingModule
  ],
  declarations: [FarmerassistancedetailPage]
})
export class FarmerassistancedetailPageModule {}
