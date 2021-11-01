import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/APIs/user/user.service';

import { Router } from '@angular/router';

import { MatListModule } from '@angular/material/list';

import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  menuActionGroupRelation  : any = {
    groupId : null,
    menuId : '1',
    permission : '1'
  }

  public menusData = [];
  public subMenuData = [];

  constructor(private UserService: UserService, private route: Router, private ngxService: NgxUiLoaderService) { }

  routeMenu(){
    console.log(this.subMenuData)
    this.route.navigate(["/admin-addmenu"])
  }


  ngOnInit(): void {

    //this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s

    //console.log(this.subMenuData)
    console.log(this.menusData)

    this.UserService.getAllMenu().subscribe(data => {

      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];
      console.log(getCountArray["childMenuList"])


      for(var d of getCountArray["chidMenuList"])
      {
        this.menusData.push({"menuId" : d["menuId"],"name" : d["name"] ,"alias" : d["alias"], "orderNumber" : d["orderNumber"], "parentMenuId" : d["parentMenuId"],
        "status" : d["status"], "childMenus" : d["chidMenuList"]})


      //   if (d["chidMenuList"]  != undefined){
      //  //   this.subMenuData.push(d["chidMenuList"])
      //     this.subMenuData = d["chidMenuList"]
      //   }
      }

      this.ngxService.stop();


    })

  }

}
