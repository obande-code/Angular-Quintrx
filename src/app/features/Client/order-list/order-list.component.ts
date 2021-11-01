import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private UserService: UserService, private _route : Router) { }


  displayedColumns: string[] = ['name','dob' , 'Status', "Action"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  countIn = 0;
  countCompleted = 0;
  countArchived = 0;
  countNeeds = 0;
  countCanceled = 0;
  countNeedsAttention = 0;

  isStatus = false;
  showButton = false;


  displayReports = []
  showContent;
  showEdit;
  packageIds = []
  userdetailData = [];


  copyD = []
  serviceArray = []
  newarray = []
  colors = [{ status: "Completed", toggle2: false }, { status: "In Progress", toggle2: true },
  { status: "Canceled", toggle2: true },
  { status: "Archived", toggle2: false},
  {status : "Needs Attention", toggle : false}];
  getColor(statu) {


    return this.colors.filter(item => item.status === statu)[0].toggle2
    // could be better written, but you get the idea
  }


  editUser(e)
  {

    localStorage.setItem("groupId", "2")
   // this.UserService.clientSideCheck = 7;
    this.UserService.clientSideData = e;

   // localStorage.setItem("serviceMasterData", e["serviceMasterData"])
   console.log( e["streetAddress"])
   localStorage.setItem("fullname", e["name"])
   localStorage.setItem("place", e["streetAddress"])
   localStorage.setItem("email", e["email"])
   localStorage.setItem("orderId", e["orderId"])
   localStorage.setItem("dob", e["dateOfBirth"])
   localStorage.setItem("zip", e["zip"])
   localStorage.setItem("status", e["status"])
   localStorage.setItem("houseApt", e["houseApt"])

    localStorage.setItem("serviceMasterData", JSON.stringify(e["serviceMasterData"]))


    console.log(this.UserService.clientSideData)
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
  isActive = 'report-icon-button'
  isInCompleted = 'report-icon-button'
  isInProgress = 'report-icon-button'
  isInNeeds = 'report-icon-button'
  isInArchived = 'report-icon-button'
  isInCanceled = 'report-icon-button'
  isInAll = 'report-icon-button'
  
  countAll  = 0;
  showStatusMsg = false;
  msg = "Order Placed Successfully."
  ngOnInit(): void {

    if(localStorage.getItem("orderSuccess") == "yes")
    {
      this.showStatusMsg = true;
    }
    else
    {
      this.showStatusMsg = false;
    }


    //this.ngxService.start();

    
  /*

  inProgress=0;
  completed=1,
  needsAttention=2,
  canceled=3,
  archived=4,
  */



    var optionsCounter = 0;


    if(localStorage.getItem("orderStatus") == "1")
    {
      console.log("hi")
      this.showButton = true;
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
            "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"]})
           // this.countCompleted = this.countCompleted + 1;
        }
       
        this.copyD = []


      //  console.log(this.displayReports)
        this.dataSource = new MatTableDataSource(this.displayReports);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;



      }
      })

    }
    else if(localStorage.getItem("orderStatus") == "2")
    {
      console.log("need attention")
      this.showButton = true;
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
            "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"]})
          //  this.countNeedsAttention = this.countNeedsAttention + 1;
        }

        this.copyD = []


      //  console.log(this.displayReports)
        this.dataSource = new MatTableDataSource(this.displayReports);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;



      }
      })
    }
    else if(localStorage.getItem("orderStatus") == "3")
    {
      console.log("cancel")
      console.log("need attention")
      this.showButton = true;
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
            "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"]})
           // this.countCanceled = this.countCanceled + 1;
        }
       
        this.copyD = []


      //  console.log(this.displayReports)
        this.dataSource = new MatTableDataSource(this.displayReports);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;



      }
      })
    }
    else if(localStorage.getItem("orderStatus") == "4")
    {
      console.log("archive")
      this.showButton = true;
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
            "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"]})
          //  this.countArchived = this.countArchived + 1;
        }
       
        this.copyD = []


      //  console.log(this.displayReports)
        this.dataSource = new MatTableDataSource(this.displayReports);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;



      }
      })
    }
    else if(localStorage.getItem("orderStatus") == "0")
    {
      console.log("in progress")
      this.showButton = true;


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
            "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"]})
           // this.countIn = this.countIn + 1;
        }
       
      


      //  console.log(this.displayReports)
        this.dataSource = new MatTableDataSource(this.displayReports);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;



      }
      })
    }
    else
    {
     // console.log(localStorage.getItem("orderStatus"))
      this.showButton = false;
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
            "serviceMasterData" : d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"]})
         //   this.countIn = this.countIn + 1;
        }
        else if(d["status"] == true)
        {

          var trimmedDate = d["createdDateTime"].slice(0, 10)

          this.displayReports.push({ "status" : "Completed", "name" : d["firstName"] + " " + d["lastName"],
           "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
            "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
            "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"]})
          //  this.countCompleted = this.countCompleted + 1;
        }
        if(d["status"] == 4)
        {

          var trimmedDate = d["createdDateTime"].slice(0, 10)

          this.displayReports.push({ "status" : "Archived", "name" : d["firstName"] + " " + d["lastName"],
            "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
            "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
            "serviceMasterData" : d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"]})
          //  this.countArchived = this.countArchived + 1;
        }
        else if(d["status"] == 3)
        {

          var trimmedDate = d["createdDateTime"].slice(0, 10)
          this.displayReports.push({  "status" : "Canceled", "name" : d["firstName"] + " " + d["lastName"],
             "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
            "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
            "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"]})
         //   this.countCanceled = this.countCanceled + 1;
        }
        else if(d["status"] == 2)
        {

          var trimmedDate = d["createdDateTime"].slice(0, 10)
          this.displayReports.push({  "status" : "Needs Attention", "name" : d["firstName"] + " " + d["lastName"],
             "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
            "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
            "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"]})
          //  this.countNeedsAttention = this.countNeedsAttention + 1;
        }
        this.copyD = []


      //  console.log(this.displayReports)
        this.dataSource = new MatTableDataSource(this.displayReports);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;



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
}
