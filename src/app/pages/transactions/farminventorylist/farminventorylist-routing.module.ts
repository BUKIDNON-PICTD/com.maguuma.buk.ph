import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarminventorylistPage } from './farminventorylist.page';

const routes: Routes = [
  {
    path: '',
    component: FarminventorylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarminventorylistPageRoutingModule {}
