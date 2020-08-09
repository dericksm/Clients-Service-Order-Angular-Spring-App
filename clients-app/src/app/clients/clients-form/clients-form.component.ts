import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Client } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {

  constructor(
    private clientService: ClientsService,
    private route: ActivatedRoute
    ) { }

  public client: Client = new Client()
  public showMessage: boolean = false
  public error: boolean = false
  public messages: String[] = ['Salvo com sucesso']
  private id: string

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if(!isNullOrUndefined(this.id)) {
      this.clientService.getById(this.id).subscribe(
        res => {
        this.client = res
      }, err => {
        this.client = new Client()
      })
    }
  }

  onSubmit(){
    if(this.client.id){
      this.clientService.update(this.client).subscribe(
        res => {
        this.showMessage = true      
        this.messages = ['Client atualizado com sucesso']
      }, error => {      
        this.showMessage = true
        this.error = true
        this.messages = [error.error.errors]
      }
      )
    } else{
      this.clientService.save(this.client).subscribe(
        res => {
        this.showMessage = true
        this.client = res
      }, error => {      
        this.showMessage = true
        this.error = true
        this.messages = [error.error.errors]
      }
      )
    }
  }

}
