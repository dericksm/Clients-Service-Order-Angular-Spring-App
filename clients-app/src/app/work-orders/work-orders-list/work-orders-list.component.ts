import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../services/work-order.service';
import { WorkOrder } from '../../models/work-order.model';

@Component({
  selector: 'app-work-orders-list',
  templateUrl: './work-orders-list.component.html',
  styleUrls: ['./work-orders-list.component.css']
})
export class WorkOrdersListComponent implements OnInit {

  public name: string
  public month = ""
  public months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12]
  public workOrderList: WorkOrder[] = []
  public showMessage: boolean = false
  public message: string = 'Nenhum registro encontrado'

  constructor(private workOrderService: WorkOrderService) { }

  ngOnInit(): void {
  }

  search(){
    this.workOrderService.search(this.name, this.month).subscribe(
      res => {
      this.workOrderList = res
      if(this.workOrderList.length == 0) {
        this.showMessage = true
      } else {
        this.showMessage = false
      }
    })
  }

}
