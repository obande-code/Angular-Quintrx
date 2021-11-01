import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.scss']
})
export class SalesDashboardComponent implements OnInit {

  constructor(private _route : Router, private UserService : UserService) { }


  newlead()
  {
    this.UserService.newLeadCheck = 1;
    this._route.navigate(['/newleads']);
  }

  followUp()
  {
    this.UserService.newLeadCheck = 2;
    this._route.navigate(['/newleads']);
  }


  ngOnInit(): void {
  }

}
