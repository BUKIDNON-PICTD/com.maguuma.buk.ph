import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyperiodPageRoutingModule } from './surveyperiod-routing.module';

import { SurveyperiodPage } from './surveyperiod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyperiodPageRoutingModule
  ],
  declarations: [SurveyperiodPage]
})
export class SurveyperiodPageModule {}
