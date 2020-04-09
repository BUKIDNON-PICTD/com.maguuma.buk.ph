import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComodityfarmercrosstabPage } from './comodityfarmercrosstab.page';

const routes: Routes = [
  {
    path: '',
    component: ComodityfarmercrosstabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComodityfarmercrosstabPageRoutingModule {}
