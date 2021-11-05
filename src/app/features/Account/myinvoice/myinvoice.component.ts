import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/APIs/user/user.service';
import { environment } from 'src/environments/environment';
import { AgreementdocumentsComponent } from 'src/app/modals/agreementdocuments/agreementdocuments.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-myinvoice',
  templateUrl: './myinvoice.component.html',
  styleUrls: ['./myinvoice.component.scss']
})
export class MyinvoiceComponent implements OnInit {

  constructor(private UserService : UserService, private modal : NgbModal) { }

  isData = false;
  msg;
  public loading: boolean;

  
  displayedColumns: string[] = ['startdate','enddate' , 'created', "name", "client", "payment", "docs"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  myDate = new Date();
  newDate  = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');


  validationMsg = false;
  fromdatecheck = false;
  enddatecheck = false;

  
  userId = '';
  paymentStatus = '';
  fromdate;
  todate;
  isFound = false;

  isClient = true;


  displayInvoices
  search()
  {
    this.validationMsg = false;
    this.displayInvoices = []
   

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
        if(this.paymentStatus)
        {
          //console.log(this.paymentStatus)
          apiUrl =  environment.api_url + "/order/searchInvoice?startDate="+startdate+'&endDate='+enddate+'&paymentStatus='+this.paymentStatus;
        
        }

        if(!this.paymentStatus)
        {
          
          apiUrl =  environment.api_url + "/order/searchInvoice?startDate="+startdate+'&endDate='+enddate;
          
        }
      }
      else if(localStorage.getItem("userGroupId") == '2')
      {
     //   this.userId = '725'


        if(this.paymentStatus)
        {
          apiUrl =  environment.api_url + "/order/searchInvoice?startDate="+startdate+'&endDate='+enddate+'&paymentStatus='+this.paymentStatus;
        
        }

        if(!this.paymentStatus)
        {
          
          apiUrl =  environment.api_url + "/order/searchInvoice?startDate="+startdate+'&endDate='+enddate;
          
        }
      }

      this.isFound = true;
      this.loading = true;
      this.isData = false;
      this.UserService.searchInvoice(apiUrl).subscribe(data => {
      //  console.log(data)
        if(!data)
        {
          console.log("e")
        }
        else
        {
         
         
          if(data["responseObject"].length < 1)
          {


            this.msg = "No Invoice Found"
            this.isData = true
            console.log(data)
           

          }
          else
          {
            this.isData = false;
            for(var d of data["responseObject"])
            {
              var trimmedDate = d["createdDateTime"].slice(0, 10)
              var sdate = d["invoiceFromDate"].slice(0, 10)
              var tdate = d["invoiceToDate"].slice(0, 10)

              if(d["paymentStatus"] == 0)
              {
                this.displayInvoices.push({"invoiceId" : d["invoiceId"],"fromDate" : sdate, "toDate" : tdate, "paymentStatus" : "Unpaid",
              "ClientId" : d["userId"], "invoiceName" : d["invoiceName"], "createdDate" : trimmedDate})
              }
              else if(d["paymentStatus"] == 1)
              {
                this.displayInvoices.push({"invoiceId" : d["invoiceId"],"fromDate" : sdate, "toDate" : tdate, "paymentStatus" : "Paid",
              "ClientId" : d["userId"], "invoiceName" : d["invoiceName"], "createdDate" : trimmedDate})
              }
              
            }

          }
          this.dataSource = new MatTableDataSource(this.displayInvoices);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.loading = false;
        }
      })



    }

  }


  showDoc(e)
  {
    console.log(e)

    this.UserService.pagestatus = 88;
    this.UserService.invoiceId = e["invoiceId"]

    this.modal.open(AgreementdocumentsComponent, {
      size: 'xl',


    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  usersData = []
  ngOnInit(): void {



    
  }

}
