import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ShowDocumentModalComponent } from '../../Client/client-documents/show-document-modal/show-document-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-legalleads',
  templateUrl: './legalleads.component.html',
  styleUrls: ['./legalleads.component.scss']
})



export class LegalleadsComponent implements OnInit {






  constructor(private _route : Router, private UserService : UserService) { }

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
    console.log(this.UserService.clientData["userId"]);


    console.log(this.userdetailId)

    var pkgser = [];
    var counter = 0;



   this._route.navigate(['/legalstatus']);
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  userIdCode;

  displayLeads = []
  showContent;
  ngOnInit(): void {

    setTimeout(() => this.showContent = true, 250);



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

      console.log(this.displayLeads)
      this.dataSource = new MatTableDataSource(this.displayLeads);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    })



/*
    this.UserService.getUserDetail().subscribe(data => {
      let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];

        for(var d of getCountArray)
        {
         // console.log(d["user"]["userStatusCode"])
          //console.log(d)


          if(d["user"]["userStatusCode"]  > 3)
          {
            this.displayLeads.push({"name" : d["contactPersonFirstname"] + " " + d["contactPersonLastname"], "companyname" : d["companyRegisteredName"],
                "email" : d["contactPersonEmail"], "userid" : d["userId"], "address" : d["address"],
                "city" : d["city"], "state" : d["state"], "zipcode" : d["zipcode"], "userDetailId" : d["userDetailId"] , "userEmail" : d["user"]["email"], "code" : d["user"]["userStatusCode"]})
          }

        }
        console.log(this.displayLeads)
        this.dataSource = new MatTableDataSource(this.displayLeads);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
    */





  }

}
