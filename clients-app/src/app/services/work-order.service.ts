import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WorkOrder } from "../models/work-order.model";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: "root",
})
export class WorkOrderService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiURL + "/api/work-orders";

  save(workOrder: WorkOrder): Observable<WorkOrder> {
    return this.http.post<WorkOrder>(this.apiUrl, workOrder);
  }

  search(name: string, month: string): Observable<any> {
    const params = new HttpParams().set("name", name).set("month", month);

    return this.http.get(this.apiUrl + "?" + params.toString());
  }
}
