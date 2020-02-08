import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  // maguuma modules
  {
    path: 'farminventorylist',
    loadChildren: () => import('./pages/transactions/farminventorylist/farminventorylist.module').then( m => m.FarminventorylistPageModule)
  },
  {
    path: 'farmerlist',
    loadChildren: () => import('./pages/transactions/farmerlist/farmerlist.module').then( m => m.FarmerlistPageModule)
  },
  {
    path: 'commodity',
    loadChildren: () => import('./pages/master/commodity/commodity.module').then( m => m.CommodityPageModule)
  },
  {
    path: 'commoditytype',
    loadChildren: () => import('./pages/master/commoditytype/commoditytype.module').then( m => m.CommoditytypePageModule)
  },
  {
    path: 'commodityvariety',
    loadChildren: () => import('./pages/master/commodityvariety/commodityvariety.module').then( m => m.CommodityvarietyPageModule)
  },
  {
    path: 'facility',
    loadChildren: () => import('./pages/master/facility/facility.module').then( m => m.FacilityPageModule)
  },
  {
    path: 'livestockbreed',
    loadChildren: () => import('./pages/master/livestockbreed/livestockbreed.module').then( m => m.LivestockbreedPageModule)
  },
  {
    path: 'livestockspecie',
    loadChildren: () => import('./pages/master/livestockspecie/livestockspecie.module').then( m => m.LivestockspeciePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'capturefarm',
    loadChildren: () => import('./pages/transactions/capturefarm/capturefarm.module').then( m => m.CapturefarmPageModule)
  },
  {
    path: 'capturefarmer',
    loadChildren: () => import('./pages/transactions/capturefarmer/capturefarmer.module').then( m => m.CapturefarmerPageModule)
  },
  {
    path: 'entityindividual',
    loadChildren: () => import('./pages/transactions/entityindividual/entityindividual.module').then( m => m.EntityindividualPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
