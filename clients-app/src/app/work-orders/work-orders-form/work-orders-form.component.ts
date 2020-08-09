import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';
import { WorkOrder } from '../../models/work-order.model';
import { WorkOrderService } from '../../services/work-order.service';

@Component({
  selector: 'app-work-orders-form',
  templateUrl: './work-orders-form.component.html',
  styleUrls: ['./work-orders-form.component.css']
})

export class WorkOrdersFormComponent implements OnInit {

  public clients: Client[] = []

  public workOrder: WorkOrder = new WorkOrder()

  public showMessage: boolean = false
  public error: boolean = false
  public messages: String[] = ['Salvo com sucesso']

  constructor(private clientService: ClientsService,
              private workOrderService: WorkOrderService) { }

  ngOnInit(): void {
    this.clientService.findAll().subscribe(res => this.clients = res)
  }

  onSubmit(){
    this.workOrder.date = new Date(this.workOrder.date)
      this.workOrderService.save(this.workOrder).subscribe(
        res => {
        this.showMessage = true
        this.workOrder = new WorkOrder()
      }, error => {      
        this.showMessage = true
        this.error = true
        this.messages = [error.error.errors]
      }
      )
    }
}
