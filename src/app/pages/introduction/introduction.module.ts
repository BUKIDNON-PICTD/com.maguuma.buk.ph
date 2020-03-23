import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroductionPageRoutingModule } from './introduction-routing.module';

import { IntroductionPage } from './introduction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroductionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [IntroductionPage]
})
export class IntroductionPageModule {}
