import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';
import { config } from 'src/app/Configs/Config';
import { AdduserComponent } from '../adduser/adduser.component';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';






@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})






export class UsermanagementComponent implements OnInit {
  public loading: boolean;
  constructor(private _route : Router, private UserService : UserService, private ngxService: NgxUiLoaderService) { }

  displayUsers = [];
  sortDisplayUsers = [];
  displayedColumns: string[] = ['name', 'lastname', 'Action', 'documents'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  actionUpdate ;
  addUser()
  {
    this.isFailed = false;
    this.isAdded = false;
    this.successcheck = false;

  // let act = new userdata;
   // act.action = 'Save'
   // this.actionUpdate = act.action;
    //this.getActiondata()
    //console.log(this.actionUpdate)
   // this.getActiondata();

 //  this.UserService.userManagementStatus = 2;


    this._route.navigate(['/adduser']);


  }



  editUser(e)
  {
    this.isFailed = false;
    this.isAdded = false;
    this.successcheck = false;




    this.UserService.prolist = e;

    this.UserService.userCheck = 1
/*
    this.UserService.getUserDetail().subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        console.log(getCountArray)
        //this.displayProviders = getCountArray;
        console.log(e["id"])
       for(var d of getCountArray)
       {

        console.log(d["user"]["userId"])
         if(d["user"]["userId"] == e["id"])
         {
           console.log(d["user"])
           this.UserService.userData = d["user"];
           break;

         }
       }

      })
      */


    this.UserService.userManagementStatus = 1;
   // window.location.reload();
    this._route.navigate(['/adduser']);

  }

  isFailed = false;

  deleteUser(e)
  {
    this.isAdded = false;
    this.successcheck = false;


    var id = e["userId"];
    var userdetailId;
    //console.log(id);

    this.UserService.getUserDetailbyId(e["userId"]).subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
      //  getCountArray.reverse();
        console.log(getCountArray)
        userdetailId = getCountArray["userDetailId"]

        //this.displayProviders = getCountArray;
/*
        for(var d of getCountArray)
        {
          if(d["userId"] == id)
          {
            userdetailId = d["userDetailId"]
            break;
          }
        }
        console.log(userdetailId)
*/

        this.UserService.delUserDetials(userdetailId)

        .then((result) => {


        })
        .catch((err) => {
          console.log(err);
        });


        this.UserService.delUser(id)

        .then((result) => {

          
          
          if(result["responseCode"] == 511)
          {
           this.msg = "Unabel to delete the user.."
           this.isFailed = true;
            
          }
          else
          {
            this.isFailed = false;
            localStorage.setItem("userdel", "yes")
           // setTimeout(() => 2500000000);
            window.location.reload();
          }


         })
        .catch((err) => {
          console.log(err);


        });



    })



    /*
    this.UserService.delUser(id)

    .then((result) => {
      console.log("success")


     })
    .catch((err) => {
      console.log(err);


    });
    */


  }

  showDoc(e)
  {
    this.isFailed = false;
    this.successcheck = false;
    this.isAdded = false;
    this.UserService.adminsideAgreeCheck = 1;
    console.log(e)
    this.UserService.getuserIdFromAdmin = e["userId"]
    console.log(this.UserService.getuserIdFromAdmin)
    this._route.navigate(['/MY_DOCUMENT'])
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  successcheck = false;
  msg;
  isAdded = false;
  ngOnInit(): void {
    this.loading = true;
   // this.ngxService.start();

   if(localStorage.getItem("useradded") == "yes")
   {
     this.msg = "User added Successfully."
     this.isAdded = true;
   }
   else if(localStorage.getItem("userupdated") == "yes")
   {
     this.msg = "User updated Successfully."
     this.isAdded = true;
   }
   else if(localStorage.getItem("userdel") == "yes")
   {
    this.msg = "User deleted Successfully."
    this.isAdded = true;
   }
   else
   {
    this.isAdded = false;
   }


    this.UserService.getAllUsers().subscribe(data =>
      {

        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        getCountArray.reverse();
       
      //  getCountArray = []
        if(getCountArray.length < 1)
        {
          this.msg = "Unable to fetch Users Data"
          this.successcheck = true;
        }
        else
        {
          this.successcheck = false;
          for(var d of getCountArray)
          {
            this.displayUsers.push({"userId" : d["userId"], "firstname" : d["firstname"], "lastname" : d["lastname"], "email" : d["email"], "groupId" : d["groupId"]});
          }
  
          this.dataSource = new MatTableDataSource(this.displayUsers);
         
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

        

       
      //  this.ngxService.stop();


       // this.sortDisplayUsers = this.displayUsers.reverse();
       // console.log(this.sortDisplayUsers)
       this.loading = false;
       
      })



      this.UserService.userManagementStatus = 0
     
      localStorage.removeItem("useradded")
      localStorage.removeItem("userupdated")
      localStorage.removeItem("userdel")
      
  }

  




}

