import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarminventorylistPageRoutingModule } from './farminventorylist-routing.module';

import { FarminventorylistPage } from './farminventorylist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarminventorylistPageRoutingModule
  ],
  declarations: [FarminventorylistPage]
})
export class FarminventorylistPageModule {}
