import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-myinvoice',
  templateUrl: './myinvoice.component.html',
  styleUrls: ['./myinvoice.component.scss']
})
export class MyinvoiceComponent implements OnInit {

  constructor(private UserService : UserService) { }

  isData = true;
  msg = 'No Invoice found'
  public loading: boolean;

  
  displayedColumns: string[] = ['startdate','enddate' , 'duration', "name", "client", "payment"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  validationMsg = false;
  fromdatecheck = false;
  enddatecheck = false;

  
  userId = '';
  orderStatus = '';
  fromdate;
  todate;
  isFound = true;

  isClient = true;



  search()
  {

  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  usersData = []
  ngOnInit(): void {



    this.UserService.getAllUsers().subscribe(data => {

      // console.log(data)

       if(data["responseCode"] == 111)
       {
         for(var d of data["responseObject"])
         {
           if(d["groupId"] == 2)
           {
             this.usersData.push({"fullname" : d["firstname"] + " " + d["lastname"], "userId" : d["userId"], "groupId" : d["groupId"]})
           }
         }
       }

     })
  }

}
