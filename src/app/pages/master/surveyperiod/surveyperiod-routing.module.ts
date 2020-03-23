import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyperiodPage } from './surveyperiod.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyperiodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyperiodPageRoutingModule {}
