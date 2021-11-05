import { Component, OnInit } from '@angular/core';

import { IpServiceService } from './APIs/ip-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private ip: IpServiceService) { }
  title = 'Angular-Client-IP-Address';
  ipAddress: string;
  ngOnInit() {
  //  this.getIP();
  }
  /*
  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }
  */
}
