import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmlocationlivestockPage } from './farmlocationlivestock.page';

const routes: Routes = [
  {
    path: '',
    component: FarmlocationlivestockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmlocationlivestockPageRoutingModule {}
