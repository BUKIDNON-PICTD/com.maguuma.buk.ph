import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivestockspeciePage } from './livestockspecie.page';

const routes: Routes = [
  {
    path: '',
    component: LivestockspeciePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivestockspeciePageRoutingModule {}
