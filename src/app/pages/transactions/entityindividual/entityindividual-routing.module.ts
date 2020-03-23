import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntityindividualPage } from './entityindividual.page';

const routes: Routes = [
  {
    path: '',
    component: EntityindividualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntityindividualPageRoutingModule {}
