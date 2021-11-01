import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationDialogService } from 'src/app/Dialogbox/confirmation-dialog.service';




@Component({
  selector: 'app-providerlist',
  templateUrl: './providerlist.component.html',
  styleUrls: ['./providerlist.component.scss']
})
export class ProviderlistComponent implements  OnInit {

  constructor(private _route : Router, private UserService : UserService, private ngxService: NgxUiLoaderService, private confirmationDialogService: ConfirmationDialogService) {


  }

  displayedColumns: string[] = ['name', 'pocEmailAddress',"status" ,"Action"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayProviders = [];
  sortDisplayProviders = []
  msg;
  pkgMsgs = false;
  successcheck = false;


  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering

  displayAgain = [];
  getProviders()
  {
    this.UserService.getAllProviders().subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        //this.displayProviders = getCountArray;

        for(var d of getCountArray)
        {
          this.displayProviders.push({"id" : d[0], "name" : d[1], "status" : d[2]});
        }


        console.log(this.displayProviders);

      })


  }
  bindData()
  {

        console.log(this.displayAgain)
      //  console.log(this.user)
  }



public serve = [];
  editUser(e)
  {

    
    this.pkgMsgs = false;
    this.successcheck = false;
    console.log(e)
    this.serve = [];

    this.serve.push(e);
    console.log(this.serve);

    this.UserService.prolist = this.serve;
    this.UserService.check = 1;


   // window.location.reload();
    this._route.navigate(['/provider']);


  }

  message = "hello from plist";
  returnServ()
  {
    return this.serve;
  }


  deleteUser(e)
  {

    this.pkgMsgs = false;
    this.successcheck = false;

    var id = e["id"];
    console.log(id);


    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete Provider ?')
    .then((confirmed) => 
    {
      if(confirmed == true)
      {
        
        this.UserService.delProvider(id)

        .then((result) => {

          if(result["responseCode"] == 511)
          {
            this.msg = "Unable to delete provider. Response Message: " + result["responseMessage"]
            this.pkgMsgs = true;
           // console.log(result)
          }
          else if(result["responseCode"] == 314)
          {
           // setTimeout(() => 2500000000);
           localStorage.setItem("providerDel", "yes")
            window.location.reload();
            
          }
          else
          {
            this.msg = "Unable to delete provider. Response Message: " + result["responseMessage"]
            this.pkgMsgs = true;
          }

        })
        .catch((err) => {
          console.log(err);


        });
      }
      else
      {
        console.log("User Selected ", confirmed)
      }
    }
    
  
    )
    .catch(() => 
    console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
    );




/*
    this.UserService.delProvider(id)

    .then((result) => {



     })
    .catch((err) => {
      console.log(err);


    });
    */




  }
  colors = [{ statusUp: "Active", color: "green" }, { statusUp: "Inactive", color: "red" }];
  getColor(status) {
    return this.colors.filter(item => item.statusUp === status)[0].color
    // could be better written, but you get the idea
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  showContent;
  public loading: boolean;

  ngOnInit(): void {
    this.UserService.check = 0

    this.loading = true;

    if(localStorage.getItem("providerDel") == "yes")
    {
      this.msg = "Provider deleted successfully."
      this.successcheck = true;
    }
    else if(localStorage.getItem("providerAdd") == "yes")
    {
      this.msg = "Provider added successfully."
      this.successcheck = true;
    }
    else if(localStorage.getItem("providerUp") == "update")
    {
      this.msg = "Provider updated successfully."
      this.successcheck = true;
    }

    var checkStatus;
    this.UserService.getAllProviders().subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        //this.displayProviders = getCountArray;

        for(var d of getCountArray)
        {
          if(d["status"] == true)
          {
            checkStatus = 'Active';
          }
          else if(d["status"] == false)
          {
            checkStatus = 'Inactive';
          }
          this.displayProviders.push({"id" : d["providerId"], "name" : d["name"],"pocEmailAddress" : d["pocEmailAddress"], "pocPhone" : d["pocPhone"] ,"status" : d["status"], "statusUp" : checkStatus});
        }


        this.sortDisplayProviders = this.displayProviders.reverse();
        console.log(this.sortDisplayProviders)

        this.dataSource = new MatTableDataSource(this.sortDisplayProviders);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;


         this.loading =false
      })

      localStorage.removeItem("providerDel")
      localStorage.removeItem("providerAdd")
      localStorage.removeItem("providerUp")



  }

  




}
