import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmfacilitydetailPage } from './farmfacilitydetail.page';

const routes: Routes = [
  {
    path: '',
    component: FarmfacilitydetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmfacilitydetailPageRoutingModule {}
