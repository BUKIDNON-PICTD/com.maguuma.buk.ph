import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerlistPage } from './farmerlist.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerlistPageRoutingModule {}
