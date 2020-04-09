import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerlistcrosstabPage } from './farmerlistcrosstab.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerlistcrosstabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerlistcrosstabPageRoutingModule {}
