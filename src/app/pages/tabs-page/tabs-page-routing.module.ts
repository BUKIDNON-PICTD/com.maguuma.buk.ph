import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SchedulePage } from '../schedule/schedule';
import { FarmerlistPage } from '../transactions/farmerlist/farmerlist.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: 'capturefarmer',
        children: [
          {
            path: '',
            loadChildren: () => import('../transactions/capturefarmer/capturefarmer.module').then(m => m.CapturefarmerPageModule)
          }
        ]
      },
      {
        path: "farmerlist",
        children: [
          {
            path: "",
            component: FarmerlistPage
          },
          {
            path: "capturefarmer",
            loadChildren: () =>
              import("../transactions/capturefarmer/capturefarmer.module").then(
                m => m.CapturefarmerPageModule
              )
          },
          {
            path: "capturefarmer/:farmerid",
            loadChildren: () =>
              import("../transactions/capturefarmer/capturefarmer.module").then(
                m => m.CapturefarmerPageModule
              )
          },
          {
            path: "capturefarmer/spouse/:spouseid",
            loadChildren: () =>
              import("../transactions/capturefarmer/capturefarmer.module").then(
                m => m.CapturefarmerPageModule
              )
          },
          {
            path: "farmerdetail/:farmerid",
            loadChildren: () =>
              import("../transactions/farmerdetail/farmerdetail.module").then(
                m => m.FarmerdetailPageModule
              )
          },
          {
            path: "farmlocationdetail/:locationid",
            loadChildren: () =>
              import(
                "../transactions/farmlocationdetail/farmlocationdetail.module"
              ).then(m => m.FarmlocationdetailPageModule)
          },
          {
            path: "farmlocationdetail/:type/:farmerid/:itemid",
            loadChildren: () =>
              import(
                "../transactions/farmlocationdetail/farmlocationdetail.module"
              ).then(m => m.FarmlocationdetailPageModule)
          },
          {
            path: "farmlocationcommodity/:farmerid",
            loadChildren: () =>
              import(
                "../transactions/farmlocationcommodity/farmlocationcommodity.module"
              ).then(m => m.FarmlocationcommodityPageModule)
          },
          {
            path: "farmlocationcommodity/:farmerid/:commodityid",
            loadChildren: () =>
              import(
                "../transactions/farmlocationcommodity/farmlocationcommodity.module"
              ).then(m => m.FarmlocationcommodityPageModule)
          },
          {
            path: "farmlocationlivestock/:farmerid",
            loadChildren: () =>
              import(
                "../transactions/farmlocationlivestock/farmlocationlivestock.module"
              ).then(m => m.FarmlocationlivestockPageModule)
          },
          {
            path: "farmlocationlivestock/:farmerid/:livestockid",
            loadChildren: () =>
              import(
                "../transactions/farmlocationlivestock/farmlocationlivestock.module"
              ).then(m => m.FarmlocationlivestockPageModule)
          },
          {
            path: "farmfacilitydetail/:farmerid",
            loadChildren: () =>
              import(
                "../transactions/farmfacilitydetail/farmfacilitydetail.module"
              ).then(m => m.FarmfacilitydetailPageModule)
          },
          {
            path: "farmfacilitydetail/:farmerid/:facilityid",
            loadChildren: () =>
              import(
                "../transactions/farmfacilitydetail/farmfacilitydetail.module"
              ).then(m => m.FarmfacilitydetailPageModule)
          },
          {
            path: "farmerassistancedetail/:farmerid",
            loadChildren: () =>
              import(
                "../transactions/farmerassistancedetail/farmerassistancedetail.module"
              ).then(m => m.FarmerassistancedetailPageModule)
          },
          {
            path: "farmerassistancedetail/:farmerid/:assistanceid",
            loadChildren: () =>
              import(
                "../transactions/farmerassistancedetail/farmerassistancedetail.module"
              ).then(m => m.FarmerassistancedetailPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/about',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

