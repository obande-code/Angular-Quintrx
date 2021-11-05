import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-newleads',
  templateUrl: './newleads.component.html',
  styleUrls: ['./newleads.component.scss']
})
export class NewleadsComponent implements OnInit {
  public loading: boolean = false;
  constructor(private UserService : UserService, private _route : Router) { }



  userdetailId;
  displayedColumns: string[] = ['sr','name','cname' ,'email', "Action"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showDetails(e)
  {
    console.log(e);
    this.UserService.clientData = e;
    //console.log(this.UserService.clientData);

    this.UserService.userDetailId = e["userDetailId"];

    console.log(this.userdetailId)

    var pkgser = [];
    var counter = 0;



   this._route.navigate(['/newleaddetails']);
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  userIdCode;

  displayLeads = []
  ngOnInit(): void {
    this.loading = true;



    this.UserService.getAllUsers().subscribe(data => {




      let toStringCount = JSON.stringify(data);

      const parseCount = JSON.parse(toStringCount);

      var getCountArray = parseCount["responseObject"];




      for(var d of getCountArray)

      {



        if(d["userStatusCode"]  > 3)

        {

          this.displayLeads.push({"name" : d["userDetail"]["contactPersonFirstname"] + " " + d["userDetail"]["contactPersonLastname"], "companyname" : d["userDetail"]["companyRegisteredName"],

              "email" : d["userDetail"]["contactPersonEmail"], "userid" : d["userId"], "address" : d["userDetail"]["address"],

              "city" : d["userDetail"]["city"], "state" : d["userDetail"]["state"], "zipcode" : d["userDetail"]["zipcode"], "userDetailId" : d["userDetailId"] , "userEmail" : d["email"], "code" : d["userStatusCode"]})

        }

      }

      this.dataSource = new MatTableDataSource(this.displayLeads);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })






  }

}
