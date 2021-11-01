import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';
import { config } from 'src/app/Configs/Config';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';



@Component({
  selector: 'app-viewpackages',
  templateUrl: './viewpackages.component.html',
  styleUrls: ['./viewpackages.component.scss']
})



export class ViewPackagesComponent implements OnInit {
  public loading: boolean;
  displayServices = []
  dis = []
  serviceNames = []

  displayedColumns: string[] = ['service', 'package', 'price'];

  constructor(private _route : Router, private UserService : UserService, private ngxService: NgxUiLoaderService,
              private auth : AuthenticationService) { }

  displayUsers = [];
  sortDisplayUsers = [];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  actionUpdate ;








  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  ngOnInit(): void {
    this.loading = true;
    var x  = this.auth.getAuthFromLocalStorage();
    console.log(x)

    var email = localStorage.getItem('USER_EMAIL');
    //console.log(localStorage.getItem('USER_EMAIL'))
    var getUserId;

    this.auth.getUserGroupRelationDetailByEmail(email).subscribe(x => {
    console.log(x["responseObject"]["userId"])



    getUserId = x["responseObject"]["userDetailId"]

    console.log(getUserId)

    this.UserService.getAllPackage(getUserId).subscribe(data => {
      var counter = 0;
      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];
      console.log(getCountArray)

      var services = [];
      for(var d of getCountArray)
      {
        //console.log(d["packageServiceRelData"][counter]["serviceAlias"]);
        for(var d1 of  d["packageServiceRelData"])
        {
          services.push(d1["serviceAlias"])
          //console.log(d1)
        }
        //console.log(counter)
        this.displayServices.push({"packageName" : d["packageName"], "packagePrice" : d["packagePrice"], "serviceAlias" : services})

        services = [];

      }
      console.log(this.displayServices)

      this.dataSource = new MatTableDataSource(this.displayServices);
        console.log(this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      console.log(counter)
      this.dis = this.displayServices
      this.loading = false;



    //console.log(this.dis)


    })
  })


  }




}

