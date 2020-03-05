import { EntityindividualPage } from "../transactions/entityindividual/entityindividual.page";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs-page";
import { HomePage } from "../home/home.page";
import { FarmerlistPage } from "../transactions/farmerlist/farmerlist.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "home",
        children: [
          {
            path: "",
            component: HomePage
          }
          // ,
          // {
          //   path: 'session/:sessionId',
          //   // loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          // }
        ]
      },
      {
        path: "entityindividual",
        children: [
          {
            path: "",
            component: EntityindividualPage
          }
          // ,
          // {
          //   path: 'session/:sessionId',
          //   // loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          // }
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
            path: "farmlocationdetail/:farmerid",
            loadChildren: () =>
              import(
                "../transactions/farmlocationdetail/farmlocationdetail.module"
              ).then(m => m.FarmlocationdetailPageModule)
          },
          {
            path: "farmlocationdetail/:farmerid/:locationid",
            loadChildren: () =>
              import(
                "../transactions/farmlocationdetail/farmlocationdetail.module"
              ).then(m => m.FarmlocationdetailPageModule)
          },
          {
            path: "farmlocationcommodity/:farmerid/:locationid/:commodityid",
            loadChildren: () =>
              import(
                "../transactions/farmlocationcommodity/farmlocationcommodity.module"
              ).then(m => m.FarmlocationcommodityPageModule)
          },
          {
            path: "farmlocationlivestock/:farmerid/:locationid/:livestockid",
            loadChildren: () =>
              import(
                "../transactions/farmlocationlivestock/farmlocationlivestock.module"
              ).then(m => m.FarmlocationlivestockPageModule)
          },
          {
            path: "farmfacilitydetail/:farmerid/:facilityid",
            loadChildren: () =>
              import(
                "../transactions/farmfacilitydetail/farmfacilitydetail.module"
              ).then(m => m.FarmfacilitydetailPageModule)
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
        path: "",
        redirectTo: "/app/tabs/home",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
