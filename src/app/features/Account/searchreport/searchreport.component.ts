import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { UserService } from 'src/app/APIs/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-searchreport',
  templateUrl: './searchreport.component.html',
  styleUrls: ['./searchreport.component.scss']
})
export class SearchreportComponent implements OnInit {

  constructor(private UserService : UserService, private auth : AuthenticationService, private _route : Router) { }
  public loading: boolean;
  isFound = false;


  displayedColumns: string[] = ['name','dob' , 'Status', "Action"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  myDate = new Date();
  newDate  = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');





  colors = [{ status: "Completed", toggle2: false }, { status: "In Progress", toggle2: true },
  {status: "Archived", toggle2: false },
  {status: "Canceled", toggle2: false },
  {status : "Needs Attention", toggle2 : false}];
  getColor(statu) {


    return this.colors.filter(item => item.status === statu)[0].toggle2
    // could be better written, but you get the idea
  }


userId = '';
orderStatus = '';
fromdate;
todate;

msg
validationMsg = false;
fromdatecheck = false;
enddatecheck = false;

isData = false;
isClientSelected = false;

displayReports = []
  search()
  {
    this.validationMsg = false;
    this.displayReports = []
   

    var startdate;
    var enddate;

    this.fromdate = (<HTMLInputElement>document.getElementById("user-fromdate")).value;
    this.todate = (<HTMLInputElement>document.getElementById("user-todate")).value;
   
    //let s  = formatDate(createPerm, 'MM-dd-yyyy', 'en-US')
   
    //this.form.value["dateOfBirth"] = s;
   


    if(!this.fromdate)
    {
      this.msg = "Please enter the start date"
      this.validationMsg = true;
      this.fromdatecheck = true;
      this.enddatecheck = false;

    }
    else if(!this.todate)
    {
      this.msg = "Please enter the end date"
      this.validationMsg = true;
      this.enddatecheck = true;
      this.fromdatecheck = false;
    }
    else
    {
     
      this.enddatecheck = false;
      this.fromdatecheck = false;

      this.validationMsg = false;
      let s  = formatDate(this.fromdate, 'MM-dd-yyyy', 'en-US')
        
      startdate = s;


      let s1  = formatDate(this.todate, 'MM-dd-yyyy', 'en-US')
        
      enddate = s1;


      var apiUrl;
      if(localStorage.getItem("userGroupId") == '3')
      {
          if(this.orderStatus && !this.userId)
        {
          apiUrl =  environment.api_url + "/order/findOrder?startDate="+startdate+'&endDate='+enddate+'&orderStatus='+this.orderStatus;
          console.log("order")
        
        }

        if(this.userId && !this.orderStatus)
        {
          this.isClientSelected = true
          apiUrl =  environment.api_url + "/order/findOrder?startDate="+startdate+'&endDate='+enddate+'&userId='+this.userId;
          console.log("userid")
         
        }

        if(this.userId && this.orderStatus)
        {
          this.isClientSelected = true
          apiUrl =  environment.api_url + "/order/findOrder?startDate="+startdate+'&endDate='+enddate+'&orderStatus='+this.orderStatus+'&userId='+this.userId;
          console.log("userid orders")
          
        }

        if(!this.userId && !this.orderStatus)
        {
          
          apiUrl =  environment.api_url + "/order/findOrder?startDate="+startdate+'&endDate='+enddate;
          console.log("dates")
          
        }
      }
      else if(localStorage.getItem("userGroupId") == '2')
      {
        this.userId = '725'


        if(this.userId && !this.orderStatus)
        {
          apiUrl =  environment.api_url + "/order/findOrder?startDate="+startdate+'&endDate='+enddate+'&userId='+this.userId;
          console.log("userid")
          
        }

        if(this.userId && this.orderStatus)
        {
          apiUrl =  environment.api_url + "/order/findOrder?startDate="+startdate+'&endDate='+enddate+'&orderStatus='+this.orderStatus+'&userId='+this.userId;
          console.log("userid orders")
        }
      }

     
      
      console.log(this.userId)
      this.loading = true
       this.isFound = true;
      this.UserService.searchOrder(apiUrl)
      .then((result) => {
        if(result["responseCode"] == 0)
        {
          let toStringCount = JSON.stringify(result);
          const parseCount = JSON.parse(toStringCount);
          var getCountArray = parseCount["responseObject"];

        
            if(getCountArray.length < 1)
            {
              this.msg = "No Reports found"
              this.isData = true
            }
            else
            {
              this.isData = false;
              for( var d of getCountArray)
              {

                  if(d["status"] == false)
                {

                  var trimmedDate = d["createdDateTime"].slice(0, 10)

                  this.displayReports.push({ "status" : "In Progress", "name" : d["firstName"] + " " + d["lastName"],
                    "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                    "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                    "serviceMasterData" : d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                    "socialSecurityNumber" : d["socialSecurityNumber"]})
                //   this.countIn = this.countIn + 1;
                }
                else if(d["status"] == true)
                {

                  var trimmedDate = d["createdDateTime"].slice(0, 10)

                  this.displayReports.push({ "status" : "Completed", "name" : d["firstName"] + " " + d["lastName"],
                  "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                    "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                    "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                    "socialSecurityNumber" : d["socialSecurityNumber"]})
                  //  this.countCompleted = this.countCompleted + 1;
                }
                if(d["status"] == 4)
                {

                  var trimmedDate = d["createdDateTime"].slice(0, 10)

                  this.displayReports.push({ "status" : "Archived", "name" : d["firstName"] + " " + d["lastName"],
                    "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                    "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                    "serviceMasterData" : d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                    "socialSecurityNumber" : d["socialSecurityNumber"]})
                  //  this.countArchived = this.countArchived + 1;
                }
                else if(d["status"] == 3)
                {

                  var trimmedDate = d["createdDateTime"].slice(0, 10)
                  this.displayReports.push({  "status" : "Canceled", "name" : d["firstName"] + " " + d["lastName"],
                    "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                    "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                    "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                    "socialSecurityNumber" : d["socialSecurityNumber"]})
                //   this.countCanceled = this.countCanceled + 1;
                }
                else if(d["status"] == 2)
                {

                  var trimmedDate = d["createdDateTime"].slice(0, 10)
                  this.displayReports.push({  "status" : "Needs Attention", "name" : d["firstName"] + " " + d["lastName"],
                    "email" : d["email"], "date" : trimmedDate, "city" : d["city"], "state" : d["state"],
                    "zip" : d["zipcode"], "userDetailId" : d["userDetailId"], "orderId" :  d["orderId"], "phone" : d["phoneNumber"], "streetAddress" : d["streetAddress"],
                    "serviceMasterData" :  d["serviceMasterData"], "dateOfBirth" : d["dateOfBirth"],  "houseApt" : d["houseApt"], "fname" :  d["firstName"], "lname" : d["lastName"], "middleName" : d["middleName"],
                    "socialSecurityNumber" : d["socialSecurityNumber"]})
                  //  this.countNeedsAttention = this.countNeedsAttention + 1;
                }
              

            }
            }
            

            this.dataSource = new MatTableDataSource(this.displayReports);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.loading = false;
          
        }
      
      })
          
  
      .catch((err) => {
        console.log(err);
        
       });
       
    }

      

      
  }


  editUser(e)
  {
    console.log(e)
    
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

    this._route.navigate(['/report-list'])

  }



  generateInvoice()
  {
    this.validationMsg = false;
   

    var startdate;
    var enddate;

    this.fromdate = (<HTMLInputElement>document.getElementById("user-fromdate")).value;
    this.todate = (<HTMLInputElement>document.getElementById("user-todate")).value;

    if(!this.fromdate)
    {
      this.msg = "Please enter the start date"
      this.validationMsg = true;
      this.fromdatecheck = true;
      this.enddatecheck = false;

    }
    else if(!this.todate)
    {
      this.msg = "Please enter the end date"
      this.validationMsg = true;
      this.enddatecheck = true;
      this.fromdatecheck = false;
    }
    else
    {
      this.enddatecheck = false;
      this.fromdatecheck = false;

      this.validationMsg = false;
      let s  = formatDate(this.fromdate, 'MM-dd-yyyy', 'en-US')
        
      startdate = s;


      let s1  = formatDate(this.todate, 'MM-dd-yyyy', 'en-US')
        
      enddate = s1;

      var apiUrl;
      if(localStorage.getItem("userGroupId") == '3')
      {
          if(this.orderStatus && !this.userId)
        {
          apiUrl =  environment.api_url + "/order/generateInvoice?startDate="+startdate+'&endDate='+enddate+'&orderStatus='+this.orderStatus;
          console.log("order")
        
        }

        if(this.userId && !this.orderStatus)
        {
          this.isClientSelected = true
          apiUrl =  environment.api_url + "/order/generateInvoice?startDate="+startdate+'&endDate='+enddate+'&userId='+this.userId;
          console.log("userid")
         
        }

        if(this.userId && this.orderStatus)
        {
          this.isClientSelected = true
          apiUrl =  environment.api_url + "/order/generateInvoice?startDate="+startdate+'&endDate='+enddate+'&orderStatus='+this.orderStatus+'&userId='+this.userId;
          console.log("userid orders")
          
        }

        if(!this.userId && !this.orderStatus)
        {
          
          apiUrl =  environment.api_url + "/order/generateInvoice?startDate="+startdate+'&endDate='+enddate;
          console.log("dates")
          
        }

        this.isFound = true;


        this.UserService.generateInvoice(apiUrl)
          .subscribe(result => {
            console.log(result)

            if(result["responseMessage"] == "Invoice generated successfully.")
            {
              console.log("Success")
              this._route.navigate(['/INVOICES'])
              
            }
            else
            {
              this.msg = "Failed to generate invoice. Response Message: " + result["responseMessage"]
              this.validationMsg = true
            }
          
          })
          
  
      }

    }
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  usersData = []
  isClient = true;
  ngOnInit(): void {


    if(localStorage.getItem("userGroupId") == '3')
    {
      console.log("admin")

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
    else if(localStorage.getItem("userGroupId") == '2')
    {
      this.isClient = false;

      var email = localStorage.getItem('USER_EMAIL');

      this.auth.getUserGroupRelationDetailByEmail(email).subscribe(x => {
        console.log(x["responseObject"]["userId"])
  
        this.userId = x["responseObject"]["userId"]
  
  
      })
    }
  }

}
