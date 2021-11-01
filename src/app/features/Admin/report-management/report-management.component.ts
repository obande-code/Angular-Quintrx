import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { UserService } from 'src/app/APIs/user/user.service';


@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.scss']
})


export class ReportManagementComponent implements OnInit {
  public loading: boolean;


  displayedColumns: string[] = ['name','dob' , 'Status', "Action"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  //dtOptions: DataTables.Settings = {};
  //dtTrigger : Subject<any>  =  new Subject();





  constructor(private UserService : UserService, private _route : Router, private auth : AuthenticationService,
              private ngxService: NgxUiLoaderService) {
  }




  countIn = 0;
  countCompleted = 0;
  countArchived = 0;
  countNeeds = 0;
  countCanceled = 0;
  countNeedsAttention = 0;
  countAll  = 0;



  isActive = 'report-icon-button'
  isInCompleted = 'report-icon-button'
  isInProgress = 'report-icon-button'
  isInNeeds = 'report-icon-button'
  isInArchived = 'report-icon-button'
  isInCanceled = 'report-icon-button'
  isInAll = 'report-icon-button'


  displayReports = []
  showContent;
  showEdit;
  packageIds = []
  userdetailData = [];


  colors = [{ status: "Completed", toggle2: false }, { status: "In Progress", toggle2: true },
  {status: "Archived", toggle2: false },
  {status: "Canceled", toggle2: false },
  {status : "Needs Attention", toggle2 : false}];
  getColor(statu) {


    return this.colors.filter(item => item.status === statu)[0].toggle2
    // could be better written, but you get the idea
  }




  editUser(e)
  {
    console.log(e["houseApt"])
   // this.UserService.reportManageData = e;

    localStorage.setItem("fullname", e["name"])
  //  localStorage.setItem("fname", e["fname"])
    if(typeof e["fname"] == 'undefined')
    {
      localStorage.setItem("fname","")
    }
    else
    {
      localStorage.setItem("fname", e["fname"])
    }

  //  localStorage.setItem("lname", e["lname"])

    if(typeof e["lname"] == 'undefined')
    {
      localStorage.setItem("lname","")
    }
    else
    {
      localStorage.setItem("lname", e["lname"])
    }
  //  localStorage.setItem("phoneNumber", e["phone"])

    
    if(typeof e["phone"] == 'undefined')
    {
      localStorage.setItem("phoneNumber","")
    }
    else
    {
      localStorage.setItem("phoneNumber", e["phone"])
    }


  //  localStorage.setItem("middleName", e["middleName"])

    if(typeof e["middleName"] == 'undefined')
    {
      localStorage.setItem("middleName","")
    }
    else
    {
      localStorage.setItem("middleName", e["middleName"])
    }

  //  localStorage.setItem("place", e["streetAddress"])

    
    if(typeof e["streetAddress"] == 'undefined')
    {
      localStorage.setItem("place","")
    }
    else
    {
      localStorage.setItem("place", e["streetAddress"])
    }
   // localStorage.setItem("email", e["email"])


    if(typeof e["email"] == 'undefined')
    {
      localStorage.setItem("email","")
    }
    else
    {
      localStorage.setItem("email", e["email"])
    }

    
    localStorage.setItem("orderId", e["orderId"])
    localStorage.setItem("status", e["status"])
  //  localStorage.setItem("dob", e["dateOfBirth"])

    if(typeof e["dateOfBirth"] == 'undefined')
    {
      localStorage.setItem("dob","")
    }
    else
    {
      localStorage.setItem("dob", e["dateOfBirth"])
    }
  //  localStorage.setItem("zip", e["zip"])

    if(typeof e["zip"] == 'undefined')
    {
      localStorage.setItem("zip","")
    }
    else
    {
      localStorage.setItem("zip", e["zip"])
    }
  //  localStorage.setItem("houseApt", e["houseApt"])
    if(typeof e["houseApt"] == 'undefined')
    {
      localStorage.setItem("houseApt","")
    }
    else
    {
      localStorage.setItem("houseApt", e["houseApt"])
    }

    localStorage.setItem("state", e["state"])
    localStorage.setItem("city", e["state"])
  


    if(typeof e["socialSecurityNumber"] == 'undefined')
    {
      localStorage.setItem("ssn","")
    }
    else
    {
      localStorage.setItem("ssn", e["socialSecurityNumber"])
    }

    
    if(typeof e["orderComment"] == 'undefined')
    {
      localStorage.setItem("orderComment","")
    }
    else
    {
      localStorage.setItem("orderComment", e["orderComment"])
    }





  //localStorage.setItem("apt", )

/*
    this.fullname = this.UserService.reportManageData["name"];
    this.place = this.UserService.reportManageData["streetAddress"];
    this.phone = this.UserService.reportManageData["phone"];
    this.email = this.UserService.reportManageData["email"];
    this.zip = this.UserService.reportManageData["zip"];
    this.city = this.UserService.reportManageData["city"];
    this.state = this.UserService.reportManageData["state"]
    this.orderId = this.UserService.reportManageData["orderId"]
    console.log(this.UserService.reportManageData["options"])
    */


    this._route.navigate(['/report-list'])

  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }



  
  inprogressStatus()
  {
    console.log("in")
   
    localStorage.setItem("orderStatus", '0');
    localStorage.setItem("inProgress" , "yes")
  }

  completedStatus(){
    localStorage.setItem("orderStatus", '1');
    localStorage.setItem("inComp" , "yes")
  }
  needsAttentionStatus()
  {
    localStorage.setItem("orderStatus", '2');
    localStorage.setItem("inNeeds" , "yes")
  }
  canceltStatus(){
    console.log("hi")
    localStorage.setItem("orderStatus", '3');
    localStorage.setItem("inCanceled" , "yes")
  }

  archivedStatus(){
    localStorage.setItem("orderStatus", '4');
    localStorage.setItem("inArchived" , "yes")
  }


  showAllReports()
  {
    localStorage.setItem("orderStatus", '-1');
    localStorage.setItem("inAll" , "yes")
    console.log("alll")
    window.location.reload()
  }


 // toggle2 = false;
 copyD = []
 serviceArray = []
 newarray = []
 successMsgs;
 msg;
 isData = false;
  ngOnInit(): void {

    this.loading = true;

    this.ngxService.start();

    var email = localStorage.getItem('USER_EMAIL');
    //console.log(localStorage.getItem('USER_EMAIL'))
    var groupId;

    this.auth.getUserGroupRelationDetailByEmail(email).subscribe(x => {
      console.log(x["responseObject"]["userId"])

      groupId = x["responseObject"]["groupId"]

      //this.UserService.groupId = groupId;

      localStorage.setItem("groupId", groupId);

    if(groupId == 2)
    {
      if(localStorage.getItem("orderStatus") == "1")
      {
        console.log("hi")
      // this.showButton = true;
        if(localStorage.getItem("inComp") == "yes")
        {
          this.isInCompleted = 'report-icon-button-active'
        }

        this.UserService.getMyDashboardDetails().subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var counts = obj["responseObject"]
    
          this.countCompleted = counts["completed"]
          this.countNeedsAttention = counts["needsAttention"]
          this.countCanceled = counts["canceled"]
          this.countArchived = counts["archived"]
          this.countIn = counts["inProgress"]
          this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
          
        })

        this.UserService.getOrderByStatus(1).subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var x = obj["responseObject"]

          if(x.length < 1)
          {
            this.loading = false;
            this.msg = "No Report Found"
            this.isData = true;
          }
          else
          {
            
            for(var d of x)
            {

            
            
              if(d["status"] == true)
              {
                var trimmedDate = d["createdDateTime"].slice(0, 10)
                this.displayReports.push({ "status" : "Completed", "name" : d["firstName"] + " " + d["lastName"],
                "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                  "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                  "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                  "orderComment" : d["orderComment"]})
                // this.countCompleted = this.countCompleted + 1;
              }
            
              this.copyD = []


            //  console.log(this.displayReports)
              this.dataSource = new MatTableDataSource(this.displayReports);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              


            }
            this.loading = false
          }

        })

      }
      else if(localStorage.getItem("orderStatus") == "2")
      {
        console.log("need attention")
      //  this.showButton = true;
        if(localStorage.getItem("inNeeds") == "yes")
        {
          this.isInNeeds = 'report-icon-button-active'
        }

        this.UserService.getMyDashboardDetails().subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var counts = obj["responseObject"]
    
          this.countCompleted = counts["completed"]
          this.countNeedsAttention = counts["needsAttention"]
          this.countCanceled = counts["canceled"]
          this.countArchived = counts["archived"]
          this.countIn = counts["inProgress"]
          this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
          
        })



        this.UserService.getOrderByStatus(2).subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var x = obj["responseObject"]


          if(x.length < 1)
          {
            this.loading = false;
          }
          else
          {
            for(var d of x)
            {
            
            
              if(d["status"] == 2)
              {
                var trimmedDate = d["createdDateTime"].slice(0, 10)
                this.displayReports.push({ "status" : "Needs Attention", "name" : d["firstName"] + " " + d["lastName"],
                "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                  "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                  "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                  "orderComment" : d["orderComment"]})
                //  this.countNeedsAttention = this.countNeedsAttention + 1;
              }
    
              this.copyD = []
    
    
            //  console.log(this.displayReports)
              this.dataSource = new MatTableDataSource(this.displayReports);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            
            }
            this.loading = false;
          }
        

        
        })
      }
      else if(localStorage.getItem("orderStatus") == "3")
      {
        console.log("cancel")
        console.log("need attention")
      //  this.showButton = true;
        if(localStorage.getItem("inCanceled") == "yes")
        {
          this.isInCanceled = 'report-icon-button-active'
        }

        this.UserService.getMyDashboardDetails().subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var counts = obj["responseObject"]
    
          this.countCompleted = counts["completed"]
          this.countNeedsAttention = counts["needsAttention"]
          this.countCanceled = counts["canceled"]
          this.countArchived = counts["archived"]
          this.countIn = counts["inProgress"]
          this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
          
        })
        this.UserService.getOrderByStatus(3).subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var x = obj["responseObject"]

        

          for(var d of x)
        {

        
          /*
          for(var dd of d["serviceMasterData"])
          {
            //console.log(dd["serviceAlias"])
            this.serviceArray.push(dd["serviceAlias"])
          }
          */
          
        
        
          if(d["status"] == 3)
          {
            var trimmedDate = d["createdDateTime"].slice(0, 10)
            this.displayReports.push({ "status" : "Canceled", "name" : d["firstName"] + " " + d["lastName"],
            "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
              "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
              "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
              "orderComment" : d["orderComment"]})
            // this.countCanceled = this.countCanceled + 1;
          }
        
          this.copyD = []


        //  console.log(this.displayReports)
          this.dataSource = new MatTableDataSource(this.displayReports);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;


        }
        })
      }
      else if(localStorage.getItem("orderStatus") == "4")
      {
        console.log("archive")
      //  this.showButton = true;
        if(localStorage.getItem("inArchived") == "yes")
        {
          this.isInArchived = 'report-icon-button-active'
        }

        this.UserService.getMyDashboardDetails().subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var counts = obj["responseObject"]
    
          this.countCompleted = counts["completed"]
          this.countNeedsAttention = counts["needsAttention"]
          this.countCanceled = counts["canceled"]
          this.countArchived = counts["archived"]
          this.countIn = counts["inProgress"]
          this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
          
        })

        this.UserService.getOrderByStatus(4).subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var x = obj["responseObject"]

        

          for(var d of x)
        {

        
          /*
          for(var dd of d["serviceMasterData"])
          {
            //console.log(dd["serviceAlias"])
            this.serviceArray.push(dd["serviceAlias"])
          }
          */
          
        
        
          if(d["status"] == 4)
          {
            var trimmedDate = d["createdDateTime"].slice(0, 10)
            this.displayReports.push({ "status" : "Archived", "name" : d["firstName"] + " " + d["lastName"],
            "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
              "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
              "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
              "orderComment" : d["orderComment"]})
            //  this.countArchived = this.countArchived + 1;
          }
        
          this.copyD = []


        //  console.log(this.displayReports)
          this.dataSource = new MatTableDataSource(this.displayReports);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;


        }
        })
      }
      else if(localStorage.getItem("orderStatus") == "0")
      {
        console.log("in progress")
      //  this.showButton = true;


        if(localStorage.getItem("inProgress") == "yes")
        {
          this.isInProgress = 'report-icon-button-active'
        }

        this.UserService.getMyDashboardDetails().subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var counts = obj["responseObject"]
    
          this.countCompleted = counts["completed"]
          this.countNeedsAttention = counts["needsAttention"]
          this.countCanceled = counts["canceled"]
          this.countArchived = counts["archived"]
          this.countIn = counts["inProgress"]
          this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
          
        })
        this.UserService.getOrderByStatus(0).subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var x = obj["responseObject"]

        

          for(var d of x)
        {

        
          /*
          for(var dd of d["serviceMasterData"])
          {
            //console.log(dd["serviceAlias"])
            this.serviceArray.push(dd["serviceAlias"])
          }
          */
          
        
        
          if(d["status"] == false)
          {
            var trimmedDate = d["createdDateTime"].slice(0, 10)
            this.displayReports.push({ "status" : "In Progress", "name" : d["firstName"] + " " + d["lastName"],
            "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
              "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
              "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
              "orderComment" : d["orderComment"]})
            // this.countIn = this.countIn + 1;
          }
        
        


        //  console.log(this.displayReports)
          this.dataSource = new MatTableDataSource(this.displayReports);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;


        }
        })
      }
      else
      {
      // console.log(localStorage.getItem("orderStatus"))
      //  this.showButton = false;
        if(localStorage.getItem("inAll") == "yes")
        {
          this.isInAll = 'report-icon-button-active'
        }

        this.UserService.getMyDashboardDetails().subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var counts = obj["responseObject"]
    
          this.countCompleted = counts["completed"]
          this.countNeedsAttention = counts["needsAttention"]
          this.countCanceled = counts["canceled"]
          this.countArchived = counts["archived"]
          this.countIn = counts["inProgress"]
          this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
          
        })

    
      this.UserService.getAllOrderReport().subscribe(data => {

        let code = JSON.stringify(data);
        const obj = JSON.parse(code);
        var x = obj["responseObject"]
        var clientName;
        var ccc = 0;


      

        /*
        for(var d of x)
        {

          if(d["status"] == false)
          {
            this.displayReports.push({ "options" : this.serviceArray, "status" : "In Progress", "name" : d["firstName"] + " " + d["lastName"],
              "clientName" : clientName, "email" : d["email"], "date" : d["date"], "city" : d["city"], "state" : d["state"],
              "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
              "serviceMasterData" : this.copyD})
              this.countIn = this.countIn + 1;
          }
          else if(d["status"] == true)
          {
            this.displayReports.push({ "options" : this.serviceArray, "status" : "Completed", "name" : d["firstName"] + " " + d["lastName"],
              "clientName" : clientName, "email" : d["email"], "date" : d["date"], "city" : d["city"], "state" : d["state"],
              "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
              "serviceMasterData" : this.copyD})
              this.countCompleted = this.countCompleted + 1;
          }

        }
        */


        for(var d of x)
        {

          /*
          for(var dd of d["serviceMasterData"])
          {
            //console.log(dd["serviceAlias"])
            this.serviceArray.push(dd["serviceAlias"])
          }
          */

          if(d["status"] == false)
          {

            var trimmedDate = d["createdDateTime"].slice(0, 10)

            this.displayReports.push({ "status" : "In Progress", "name" : d["firstName"] + " " + d["lastName"],
              "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
              "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
              "serviceMasterData" : d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
              "orderComment" : d["orderComment"]})
          //   this.countIn = this.countIn + 1;
          }
          else if(d["status"] == true)
          {

            var trimmedDate = d["createdDateTime"].slice(0, 10)

            this.displayReports.push({ "status" : "Completed", "name" : d["firstName"] + " " + d["lastName"],
            "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
              "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
              "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
              "orderComment" : d["orderComment"]})
            //  this.countCompleted = this.countCompleted + 1;
          }
          if(d["status"] == 4)
          {

            var trimmedDate = d["createdDateTime"].slice(0, 10)

            this.displayReports.push({ "status" : "Archived", "name" : d["firstName"] + " " + d["lastName"],
              "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
              "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
              "serviceMasterData" : d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
              "orderComment" : d["orderComment"]})
            //  this.countArchived = this.countArchived + 1;
          }
          else if(d["status"] == 3)
          {

            var trimmedDate = d["createdDateTime"].slice(0, 10)
            this.displayReports.push({  "status" : "Canceled", "name" : d["firstName"] + " " + d["lastName"],
              "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
              "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
              "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"]
              ,"orderComment" : d["orderComment"]})
          //   this.countCanceled = this.countCanceled + 1;
          }
          else if(d["status"] == 2)
          {

            var trimmedDate = d["createdDateTime"].slice(0, 10)
            this.displayReports.push({  "status" : "Needs Attention", "name" : d["firstName"] + " " + d["lastName"],
              "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
              "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
              "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"]
              ,"orderComment" : d["orderComment"]})
            //  this.countNeedsAttention = this.countNeedsAttention + 1;
          }
          this.copyD = []


        //  console.log(this.displayReports)
          this.dataSource = new MatTableDataSource(this.displayReports);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;


        }
        })
      }
      localStorage.removeItem("orderSuccess")
      localStorage.removeItem("orderStatus")
      localStorage.removeItem("inProgress")
      localStorage.removeItem("inComplete")
      localStorage.removeItem("inCanceled")
      localStorage.removeItem("inNeeds")
      localStorage.removeItem("inArchived")

    }

    else if(groupId == 3)
    {
      if(localStorage.getItem("orderSnnUP") == "yes")
      {
        this.msg = "Order Updated Successfully"
        this.successMsgs = true;
      }
      else
      {
        this.successMsgs = false;
      }

      
        if(localStorage.getItem("orderStatus") == "1")
        {
          console.log("hi")
        // this.showButton = true;
          if(localStorage.getItem("inComp") == "yes")
          {
            this.isInCompleted = 'report-icon-button-active'
          }

          this.UserService.getMyDashboardDetails().subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var counts = obj["responseObject"]
      
            this.countCompleted = counts["completed"]
            this.countNeedsAttention = counts["needsAttention"]
            this.countCanceled = counts["canceled"]
            this.countArchived = counts["archived"]
            this.countIn = counts["inProgress"]
            this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
            
          })

          this.UserService.getOrderByStatus(1).subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var x = obj["responseObject"]

            console.log(x)

            for(var d of x)
          {

          
          
            if(d["status"] == true)
            {
              var trimmedDate = d["createdDateTime"].slice(0, 10)
              this.displayReports.push({ "status" : "Completed", "name" : d["firstName"] + " " + d["lastName"],
              "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                "socialSecurityNumber" : d["socialSecurityNumber"], "orderComment" : d["orderComment"]})
              // this.countCompleted = this.countCompleted + 1;
            }
          
            this.copyD = []


          //  console.log(this.displayReports)
            this.dataSource = new MatTableDataSource(this.displayReports);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;


          }
          })

        }
        else if(localStorage.getItem("orderStatus") == "2")
        {
          console.log("need attention")
        //  this.showButton = true;
          if(localStorage.getItem("inNeeds") == "yes")
          {
            this.isInNeeds = 'report-icon-button-active'
          }

          this.UserService.getMyDashboardDetails().subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var counts = obj["responseObject"]
      
            this.countCompleted = counts["completed"]
            this.countNeedsAttention = counts["needsAttention"]
            this.countCanceled = counts["canceled"]
            this.countArchived = counts["archived"]
            this.countIn = counts["inProgress"]
            this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
            
          })



          this.UserService.getOrderByStatus(2).subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var x = obj["responseObject"]

          

            for(var d of x)
          {

            
            /*
            for(var dd of d["serviceMasterData"])
            {
              //console.log(dd["serviceAlias"])
              this.serviceArray.push(dd["serviceAlias"])
            }
            */
            
          
          
            if(d["status"] == 2)
            {
              var trimmedDate = d["createdDateTime"].slice(0, 10)
              this.displayReports.push({ "status" : "Needs Attention", "name" : d["firstName"] + " " + d["lastName"],
              "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                "socialSecurityNumber" : d["socialSecurityNumber"], "orderComment" : d["orderComment"]})
              //  this.countNeedsAttention = this.countNeedsAttention + 1;
            }

            this.copyD = []


          //  console.log(this.displayReports)
            this.dataSource = new MatTableDataSource(this.displayReports);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;


          }
          })
        }
        else if(localStorage.getItem("orderStatus") == "3")
        {
          console.log("cancel")
          console.log("need attention")
        //  this.showButton = true;
          if(localStorage.getItem("inCanceled") == "yes")
          {
            this.isInCanceled = 'report-icon-button-active'
          }

          this.UserService.getMyDashboardDetails().subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var counts = obj["responseObject"]
      
            this.countCompleted = counts["completed"]
            this.countNeedsAttention = counts["needsAttention"]
            this.countCanceled = counts["canceled"]
            this.countArchived = counts["archived"]
            this.countIn = counts["inProgress"]
            this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
            
          })
          this.UserService.getOrderByStatus(3).subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var x = obj["responseObject"]

          

            for(var d of x)
          {

          
            /*
            for(var dd of d["serviceMasterData"])
            {
              //console.log(dd["serviceAlias"])
              this.serviceArray.push(dd["serviceAlias"])
            }
            */
            
          
          
            if(d["status"] == 3)
            {
              var trimmedDate = d["createdDateTime"].slice(0, 10)
              this.displayReports.push({ "status" : "Canceled", "name" : d["firstName"] + " " + d["lastName"],
              "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                "socialSecurityNumber" : d["socialSecurityNumber"], "orderComment" : d["orderComment"]})
              // this.countCanceled = this.countCanceled + 1;
            }
          
            this.copyD = []


          //  console.log(this.displayReports)
            this.dataSource = new MatTableDataSource(this.displayReports);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;

          }
          })
        }
        else if(localStorage.getItem("orderStatus") == "4")
        {
          console.log("archive")
        //  this.showButton = true;
          if(localStorage.getItem("inArchived") == "yes")
          {
            this.isInArchived = 'report-icon-button-active'
          }

          this.UserService.getMyDashboardDetails().subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var counts = obj["responseObject"]
      
            this.countCompleted = counts["completed"]
            this.countNeedsAttention = counts["needsAttention"]
            this.countCanceled = counts["canceled"]
            this.countArchived = counts["archived"]
            this.countIn = counts["inProgress"]
            this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
            
          })

          this.UserService.getOrderByStatus(4).subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var x = obj["responseObject"]

          

            for(var d of x)
          {

          
            /*
            for(var dd of d["serviceMasterData"])
            {
              //console.log(dd["serviceAlias"])
              this.serviceArray.push(dd["serviceAlias"])
            }
            */
            
          
          
            if(d["status"] == 4)
            {
              var trimmedDate = d["createdDateTime"].slice(0, 10)
              this.displayReports.push({ "status" : "Archived", "name" : d["firstName"] + " " + d["lastName"],
              "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                "socialSecurityNumber" : d["socialSecurityNumber"], "orderComment" : d["orderComment"]})
              //  this.countArchived = this.countArchived + 1;
            }
          
            this.copyD = []


          //  console.log(this.displayReports)
            this.dataSource = new MatTableDataSource(this.displayReports);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;


          }
          })
        }
        else if(localStorage.getItem("orderStatus") == "0")
        {
          console.log("in progress")
        //  this.showButton = true;


          if(localStorage.getItem("inProgress") == "yes")
          {
            this.isInProgress = 'report-icon-button-active'
          }

          this.UserService.getMyDashboardDetails().subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var counts = obj["responseObject"]
      
            this.countCompleted = counts["completed"]
            this.countNeedsAttention = counts["needsAttention"]
            this.countCanceled = counts["canceled"]
            this.countArchived = counts["archived"]
            this.countIn = counts["inProgress"]
            this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
            
          })
          this.UserService.getOrderByStatus(0).subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var x = obj["responseObject"]

          

            for(var d of x)
          {

          
            /*
            for(var dd of d["serviceMasterData"])
            {
              //console.log(dd["serviceAlias"])
              this.serviceArray.push(dd["serviceAlias"])
            }
            */
            
          
          
            if(d["status"] == false)
            {
              var trimmedDate = d["createdDateTime"].slice(0, 10)
              this.displayReports.push({ "status" : "In Progress", "name" : d["firstName"] + " " + d["lastName"],
              "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                "socialSecurityNumber" : d["socialSecurityNumber"], "orderComment" : d["orderComment"]})
              // this.countIn = this.countIn + 1;
            }
          
          


          //  console.log(this.displayReports)
            this.dataSource = new MatTableDataSource(this.displayReports);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;


          }
          })
        }
        else
        {
        // console.log(localStorage.getItem("orderStatus"))
        //  this.showButton = false;
          if(localStorage.getItem("inAll") == "yes")
          {
            this.isInAll = 'report-icon-button-active'
          }

          this.UserService.getMyDashboardDetails().subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var counts = obj["responseObject"]
      
            this.countCompleted = counts["completed"]
            this.countNeedsAttention = counts["needsAttention"]
            this.countCanceled = counts["canceled"]
            this.countArchived = counts["archived"]
            this.countIn = counts["inProgress"]
            this.countAll = this.countCompleted + this.countNeedsAttention + this.countCanceled+ this.countArchived + this.countIn;
            
          })

      
        this.UserService.getAllOrderReport().subscribe(data => {

          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var x = obj["responseObject"]
          var clientName;
          var ccc = 0;


        

          /*
          for(var d of x)
          {

            if(d["status"] == false)
            {
              this.displayReports.push({ "options" : this.serviceArray, "status" : "In Progress", "name" : d["firstName"] + " " + d["lastName"],
                "clientName" : clientName, "email" : d["email"], "date" : d["date"], "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" : this.copyD})
                this.countIn = this.countIn + 1;
            }
            else if(d["status"] == true)
            {
              this.displayReports.push({ "options" : this.serviceArray, "status" : "Completed", "name" : d["firstName"] + " " + d["lastName"],
                "clientName" : clientName, "email" : d["email"], "date" : d["date"], "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" : this.copyD})
                this.countCompleted = this.countCompleted + 1;
            }

          }
          */


          for(var d of x)
          {

            /*
            for(var dd of d["serviceMasterData"])
            {
              //console.log(dd["serviceAlias"])
              this.serviceArray.push(dd["serviceAlias"])
            }
            */

            if(d["status"] == false)
            {

              var trimmedDate = d["createdDateTime"].slice(0, 10)

              this.displayReports.push({ "status" : "In Progress", "name" : d["firstName"] + " " + d["lastName"],
                "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" : d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                "socialSecurityNumber" : d["socialSecurityNumber"], "orderComment" : d["orderComment"]})
            //   this.countIn = this.countIn + 1;
            }
            else if(d["status"] == true)
            {

              var trimmedDate = d["createdDateTime"].slice(0, 10)

              this.displayReports.push({ "status" : "Completed", "name" : d["firstName"] + " " + d["lastName"],
              "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                "socialSecurityNumber" : d["socialSecurityNumber"], "orderComment" : d["orderComment"]})
              //  this.countCompleted = this.countCompleted + 1;
            }
            if(d["status"] == 4)
            {

              var trimmedDate = d["createdDateTime"].slice(0, 10)

              this.displayReports.push({ "status" : "Archived", "name" : d["firstName"] + " " + d["lastName"],
                "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" : d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                "socialSecurityNumber" : d["socialSecurityNumber"], "orderComment" : d["orderComment"]})
              //  this.countArchived = this.countArchived + 1;
            }
            else if(d["status"] == 3)
            {

              var trimmedDate = d["createdDateTime"].slice(0, 10)
              this.displayReports.push({  "status" : "Canceled", "name" : d["firstName"] + " " + d["lastName"],
                "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                "socialSecurityNumber" : d["socialSecurityNumber"], "orderComment" : d["orderComment"]})
            //   this.countCanceled = this.countCanceled + 1;
            }
            else if(d["status"] == 2)
            {

              var trimmedDate = d["createdDateTime"].slice(0, 10)
              this.displayReports.push({  "status" : "Needs Attention", "name" : d["firstName"] + " " + d["lastName"],
                "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                "socialSecurityNumber" : d["socialSecurityNumber"], "orderComment" : d["orderComment"]})
              //  this.countNeedsAttention = this.countNeedsAttention + 1;
            }
            this.copyD = []


          //  console.log(this.displayReports)
            this.dataSource = new MatTableDataSource(this.displayReports);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;


          }
          })
        }
     
        localStorage.removeItem("orderSuccess")
        localStorage.removeItem("orderStatus")
        localStorage.removeItem("inProgress")
        localStorage.removeItem("inComplete")
        localStorage.removeItem("inCanceled")
        localStorage.removeItem("inNeeds")
        localStorage.removeItem("inArchived")
        localStorage.removeItem("orderSnnUP")

    }
    else if(groupId == 4)
    {
      this.UserService.getAllOrderReport().subscribe(data => {

        let code = JSON.stringify(data);
        const obj = JSON.parse(code);
        var x = obj["responseObject"]
        var clientName;
        var ccc = 0;
        console.log(x);

        for(var d of x)
        {

          if(d["status"] == false)
        {
          var trimmedDate = d["createdDateTime"].slice(0, 10)
          this.displayReports.push({ "status" : "In Progress", "name" : d["firstName"] + " " + d["lastName"],
            "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
            "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
            "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"]})
            this.countIn = this.countIn + 1;
        }
        else if(d["status"] == true)
        {
          var trimmedDate = d["createdDateTime"].slice(0, 10)
          this.displayReports.push({ "status" : "Completed", "name" : d["firstName"] + " " + d["lastName"],
           "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
            "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
            "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"]})
            this.countCompleted = this.countCompleted + 1;
        }
        if(d["status"] == 4)
        {
          var trimmedDate = d["createdDateTime"].slice(0, 10)
          this.displayReports.push({ "status" : "Archived", "name" : d["firstName"] + " " + d["lastName"],
            "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
            "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
            "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"]})
            this.countArchived = this.countArchived + 1;
        }
        else if(d["status"] == 3)
        {
          var trimmedDate = d["createdDateTime"].slice(0, 10)
          this.displayReports.push({ "status" : "Canceled", "name" : d["firstName"] + " " + d["lastName"],
           "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
            "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
            "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"],"middleName" : d["middleName"]})
            this.countCanceled = this.countCanceled + 1;
        }
        else if(d["status"] == 2)
        {
          var trimmedDate = d["createdDateTime"].slice(0, 10)
          this.displayReports.push({ "status" : "Needs Attention", "name" : d["firstName"] + " " + d["lastName"],
           "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
            "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
            "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"]})
            this.countNeedsAttention = this.countNeedsAttention + 1;
        }
            //  console.log(this.displayReports[ccc]["status"])
              this.dataSource = new MatTableDataSource(this.displayReports);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;


        }
        this.loading = false;

       // this.newarray = this.displayReports

     //  this.dtTrigger.next()
      })
    }
    })
   

  
  }

}
