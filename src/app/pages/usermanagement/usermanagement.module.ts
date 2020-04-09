import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsermanagementPageRoutingModule } from './usermanagement-routing.module';

import { UsermanagementPage } from './usermanagement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsermanagementPageRoutingModule
  ],
  declarations: [UsermanagementPage]
})
export class UsermanagementPageModule {}
