import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { WorkOrdersFormComponent } from './work-orders-form/work-orders-form.component';
import { WorkOrdersListComponent } from './work-orders-list/work-orders-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [WorkOrdersFormComponent, WorkOrdersListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    WorkOrdersRoutingModule
  ],
  exports : [
    WorkOrdersFormComponent,
    WorkOrdersListComponent
  ]
})
export class WorkOrdersModule { }
