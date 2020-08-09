import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WorkOrdersFormComponent } from "./work-orders-form/work-orders-form.component";
import { WorkOrdersListComponent } from "./work-orders-list/work-orders-list.component";
import { LayoutComponent } from "../layout/layout.component";
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: "work-orders",
    component: LayoutComponent,    
    canActivate: [AuthGuard],
    children: [
      { path: "form", component: WorkOrdersFormComponent },
      { path: "list", component: WorkOrdersListComponent },      
      { path: '', redirectTo: '/work-orders/list', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOrdersRoutingModule {}
