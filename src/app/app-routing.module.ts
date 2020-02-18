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
    path: 'facility',
    loadChildren: () => import('./pages/master/facility/facility.module').then( m => m.FacilityPageModule)
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
  },
  {
    path: 'livestock',
    loadChildren: () => import('./pages/master/livestock/livestock.module').then( m => m.LivestockPageModule)
  },
  {
    path: 'farmlocationdetail',
    loadChildren: () => import('./pages/transactions/farmlocationdetail/farmlocationdetail.module').then( m => m.FarmlocationdetailPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
