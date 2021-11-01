import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderReportService {

  constructor(private httpClient: HttpClient) {
  }

  showPermissionAlert(permissions) {
    alert(`Permission available for this page are ${permissions}`);
  }

  createOrderReport(form) {
    return this.httpClient.post(environment.api_url + '/order/createorder', form)
  }
}
