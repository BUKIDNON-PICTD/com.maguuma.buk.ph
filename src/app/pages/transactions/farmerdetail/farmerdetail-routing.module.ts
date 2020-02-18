import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerdetailPage } from './farmerdetail.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerdetailPageRoutingModule {}
