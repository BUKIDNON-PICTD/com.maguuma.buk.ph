import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerassistancedetailPage } from './farmerassistancedetail.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerassistancedetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerassistancedetailPageRoutingModule {}
