import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/APIs/user/user.service';

import { AdminAddmenuComponent } from '../admin-addmenu/admin-addmenu.component';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';

import { Observable } from 'rxjs';
import { TokenData } from 'src/app/modals/token-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  menuName : string;
  menulist =[];

  tokenData$: Observable<TokenData>;
  menuData$: Observable<any>;
  menus = [];


  constructor(private UserService : UserService, private _route : Router ) {

  }



  newprovider()
  {
    this._route.navigate(['/provider'])
  }

  providerlist()
  {
    this._route.navigate(['/providerlist'])
  }

  servicelist()
  {
    this._route.navigate(['/servicelist'])
  }

  usermanagement(){
    this._route.navigate(['/usermanagement'])
  }


  userGroups(){
    this._route.navigate(['/usergroups'])
  }

  reportManage()
  {
    this._route.navigate(['/REPORT_MANAGEMENT'])
  }

  manageMenu()
  {
    this._route.navigate(['/admin-menu'])
  }

  ngOnInit(): void {
    this.UserService.check = 0

  }

  showMenu() {
   // console.l
  }



}
