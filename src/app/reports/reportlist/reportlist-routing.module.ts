import { ComodityareacrosstabPageModule } from './../comodityareacrosstab/comodityareacrosstab.module';
import { ComodityareacrosstabPage } from './../comodityareacrosstab/comodityareacrosstab.page';
import { FarmerlistcrosstabPageModule } from './../farmerlistcrosstab/farmerlistcrosstab.module';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ReportlistPage } from "./reportlist.page";

const routes: Routes = [
  {
    path: "list",
    children: [
      {
        path: '',
        component: ReportlistPage,
      },
      {
        path: 'farmerlist',
        loadChildren: () => import('../../reports/farmerlist/farmerlist.module').then(m => m.FarmerlistPageModule)
      },
      {
        path: 'farmerlistcrosstab',
        loadChildren: () => import('../../reports/farmerlistcrosstab/farmerlistcrosstab.module').then(m => m.FarmerlistcrosstabPageModule)
      },
      {
        path: 'comodityareacrosstab',
        loadChildren: () => import('../../reports/comodityareacrosstab/comodityareacrosstab.module').then(m => m.ComodityareacrosstabPageModule)
      },
      {
        path: 'comodityfarmercrosstab',
        loadChildren: () => import('../../reports/comodityfarmercrosstab/comodityfarmercrosstab.module').then(m => m.ComodityfarmercrosstabPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportlistPageRoutingModule {}
