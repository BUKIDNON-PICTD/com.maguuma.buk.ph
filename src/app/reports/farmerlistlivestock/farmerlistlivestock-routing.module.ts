import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerlistlivestockPage } from './farmerlistlivestock.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerlistlivestockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerlistlivestockPageRoutingModule {}
