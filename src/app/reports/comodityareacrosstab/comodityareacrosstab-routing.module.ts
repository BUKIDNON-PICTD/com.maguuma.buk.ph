import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComodityareacrosstabPage } from './comodityareacrosstab.page';

const routes: Routes = [
  {
    path: '',
    component: ComodityareacrosstabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComodityareacrosstabPageRoutingModule {}
