import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/APIs/user/user.service';
import { AgreementdocumentsComponent } from 'src/app/modals/agreementdocuments/agreementdocuments.component';
import { ClientDocumentBllService } from '../../Client/client-documents/service/client-document-bll.service';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {





  constructor(private UserService : UserService, private _route : Router, private modal : NgbModal, private clientbill : ClientDocumentBllService) {
  }
  public loading : boolean;
  selectedDataName;
  statusselected : any  = {
    status : 'x'
  }
  displayDocuments = [];
  showContent = false;
  showGroup = false;
  checkfileStatus = false;
  msg2 = "File Uploaded Successfully"
  showreportDoc = false;
  isAdmin = true;
  isClient = false;
  isClientLegal = true;
  isAdminSide = false;

  userGroupsData = [
    {
      stype : "SSN Check",
      options : []
    },
    {
      stype : "Background Check",
      options : []
    },
    {
      stype : "Drug test",
      options : []
    }
  ]
  msg;
  checkReport = false;
  isReport = true;
  isLoading$ = false;


  showupLoadReport = false;

  address;
  fullname;
  email;
  dob;
  phone;
  place;
  city;
  cityName;
  state;
  stateName;
  zip;
  orderId;
  msg1;
  houseapt;

  checkSocial = false;
  selectedOptions = []
  showLegalButton = "notlegal";
  //checkReport = false;

  displayedColumns: string[] = ['name',"Action", "upload"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatSort) sort1: MatSort;

  displayedColumns1: string[] = ['name',"status","Action", "upload"];
  dataSource1;



  displayServices = []

  orderStatus;
  showStatusMsg = false;
  updateStatus()
  {


    console.log(this.displayServices[0]["orderId"])

    //console.log(this.statusselected)
    this.orderStatus = (<HTMLInputElement>document.getElementById("order-Status")).value;
    console.log(this.orderStatus)

    this.showStatusMsg = false;

    if(this.orderStatus == 'x')
    {
      this.showStatusMsg = true;
      this.isLoading$ = false;

    }
    else
    {
      this.showStatusMsg = false;
      this.loading = true
      this.isLoading$ = true;
      this.UserService.updateOrderReportStatus(this.displayServices[0]["orderId"], this.orderStatus)
      .then((result) => {
        console.log(result)
        if(result["responseMessage"] == "Order marked completed.")
        {
          this.isLoading$ = false;
          this._route.navigate(['/REPORT_MANAGEMENT'])
        }
      })
      .catch((err) => {
      });
    }



  }



seeReport()
{
  console.log(this.orderId)
  this.UserService.pagestatus = 10;
  this.UserService.consolodatedORderID = this.orderId
  this.modal.open(AgreementdocumentsComponent, {
    size: 'xl',


  });


}

openDoc(e)
{
  console.log(e["documentName"])
  console.log(e["orderId"])

  this.UserService.pagestatus = 20;

  this.UserService.orderId = e["orderId"]
  this.UserService.orderDetailId = e["orderDetailId"]
  console.log(this.UserService.orderDetailId)
  this.UserService.documentName = e["documentName"]
  /*
  if(e["documentName"] == "Summary of Consumer Rights.html")
  {
    this.UserService.documentName = "Summary of Consumer Rights.pdf"
  }
  else if(e["documentName"] == "application_disclosure_form.html")
  {
    this.UserService.documentName = "application_disclosure_form.pdf"
  }
  */
  if(e["isDefault"] == "Y")
  {
    this.UserService.isDefault = true
  }else if(e["isDefault"] == "N")
  {
    this.UserService.isDefault = false
  }



  this.modal.open(AgreementdocumentsComponent, {
    size: 'xl',


  });

}

isCompleted = false;
  runReport(e)
  {

    //console.log(e["pkgSerMasterRelId"])
    //console.log(e["orderDetailId"])
    this.checkReport = false;
    this.checkfileStatus = false;
    this.showReportUploadMsg = false;
    this.checkSocial = false;

    this.UserService.orderDetailId = e["orderDetailId"]

    if(this.UserService.clientSideCheck == 7)
    {


      this.UserService.pagestatus = 2;

        this.modal.open(AgreementdocumentsComponent, {
          size: 'xl',


        });


    }
    else
    {
      if(e["status"] == "Incomplete")
      {


        this.isCompleted = true;
        console.log(e["orderId"] )
        console.log(e["pkgSerMasterRelId"])
      this.UserService.checkCriminal(e["orderId"], e["pkgSerMasterRelId"])
      .then((result) => {

        if(result["responseMessage"] == "Order placed successfully.")
        {

          this.isCompleted =false
          this.msg = "Report generated successfully"
          this.checkSocial = false;
          this.checkReport = true;
          this.isReport = false;

          this.displayServices = []
          this.UserService.getReportById(this.orderId).subscribe(data =>{

            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var orders = obj["responseObject"]
            console.log(orders)

             for(var dd of orders["serviceMasterData"])
              {
                if(dd["status"] == false)
                {
                  this.displayServices.push({"serviceAlias" : dd["serviceAlias"], "pkgSerMasterRelId" : dd["pkgSerMasterRelId"],"orderDetailId" : dd["orderDetailId"]  ,"orderId" : this.orderId, "status" : "Incomplete"})
                }
                else if(dd["status"] == true)
                {
                  this.displayServices.push({"serviceAlias" : dd["serviceAlias"], "pkgSerMasterRelId" : dd["pkgSerMasterRelId"], "orderDetailId" : dd["orderDetailId"]  ,"orderId" : this.orderId, "status" : "Completed"})

                }
              }


              this.dataSource1 = new MatTableDataSource(this.displayServices);
              this.dataSource1.paginator = this.paginator;
              this.dataSource1.sort = this.sort;


            //  console.log(this.displayReports[ccc]["status"])



          })


         // this.isLoading$ = false;

        }
        else if(result["responseCode"] == 912)
        {
          this.isCompleted =false
          this.msg1 = "Report generation failed. Social Security # is not present"
          this.loading = false
          this.isLoading$ = false;
          this.checkSocial = true;
        }
        else {
          this.msg1 = "Unable to Run the Report. Response Code: " + result["responseCode"] + " " + ". Response Message: " + result["responseMessage"]
          this.isCompleted =false
          this.isLoading$ = false;
          this.checkSocial = true;
        }/*
        if(this.UserService.checkStat == "Order placed successfully.")
        {
          if(e["status"] == "Completed")
          {
            console.log(e["serviceAlias"])




          }
          else if(e["status"] == "Incomplete")
          {
            this.msg = "Report generated successfully"

            for(var d of this.displayServices)
            {

              if(d["pkgSerMasterRelId"] == e["pkgSerMasterRelId"])
              {
                d["status"] = "Completed"
              }
              console.log(d)
              this.checkReport = true;
               this.isReport = false;

            }

          }



        }
        */

      })
      .catch((err) => {
      });

      }
      else if(e["status"] == "Completed")
      {
        this.UserService.pagestatus = 3;

        this.modal.open(AgreementdocumentsComponent, {
          size: 'xl',


        });
      }
    }


  }


  colors = [{ status: "Completed", toggle2: true }, { status: "Incomplete", toggle2: false }];
  getColor(st) {


    return this.colors.filter(item => item.status === st)[0].toggle2
    // could be better written, but you get the idea
  }


  getIndex(i)
  {
    console.log(i)
  }
  file
  onFileChanged1(e,data)
  {
    this.count = 0
    this.checkfileStatus = false;
    this.checkReport = false;
    this.file = e.target.files[0];
    console.log(this.file["name"])

    this.UserService.docType = data["documentName"]
    var status = 2
    console.log(data["isDefault"])


    this.clientbill.uploadConsent(this.file, data["orderDetailId"], this.UserService.docType).subscribe(
        (event: any) => {

          console.log("hello")

         if (event.type === HttpEventType.UploadProgress) {
           // console.log(Math.round((100 * event.loaded) / event.total));
            this.count = Math.round((100 * event.loaded) / event.total)
            console.log(this.count);
            console.log('File Completely Uploaded Now');

          } else if (event instanceof HttpResponse) {
            console.log("Response while uploading :- ",event)



            if(event["body"]["responseMessage"] == "Something Went Wrong")
            {
              console.log("Error While hitting API")
            }
            else
            {
              console.log("API Successfully hit")
              console.log(this.UserService.documentName)


              if(event["body"]["responseCode"] == 0)
              {

                this.checkfileStatus = true;


              }

            }

          }
       },

        (err: any) => {
         console.log(err);
        }
        );

  }

  showReportUploadMsg = false;
  msg3 = "Report Uploaded Successfully"
  count;

  onFileChanged2(e,data)
  {
    this.checkfileStatus = false;
    this.showReportUploadMsg = false;
    this.checkReport = false;
    this.file = e.target.files[0];
    console.log(this.file)
    var status = 2
    console.log(data)

    this.clientbill.uploadReport(this.file, data["orderDetailId"], status).subscribe(
      (event: any) => {

        console.log("hello")

       if (event.type === HttpEventType.UploadProgress) {
         this.count = Math.round((100 * event.loaded) / event.total)
          console.log(this.count);
          console.log('File Completely Uploaded Now');

        } else if (event instanceof HttpResponse) {
          console.log("Response while uploading :- ",event)


          if(event["body"]["responseMessage"] == "Something Went Wrong")
          {
            console.log("Error While hitting API")
          }
          else
          {
            this.showReportUploadMsg = true;
            this.displayServices = []
            this.UserService.getReportById(this.orderId).subscribe(data =>{

              let code = JSON.stringify(data);
              const obj = JSON.parse(code);
              var orders = obj["responseObject"]
              console.log(orders)

               for(var dd of orders["serviceMasterData"])
                {
                  if(dd["status"] == false)
                  {
                    this.displayServices.push({"serviceAlias" : dd["serviceAlias"], "pkgSerMasterRelId" : dd["pkgSerMasterRelId"],"orderDetailId" : dd["orderDetailId"]  ,"orderId" : this.orderId, "status" : "Incomplete"})
                  }
                  else if(dd["status"] == true)
                  {
                    this.displayServices.push({"serviceAlias" : dd["serviceAlias"], "pkgSerMasterRelId" : dd["pkgSerMasterRelId"], "orderDetailId" : dd["orderDetailId"]  ,"orderId" : this.orderId, "status" : "Completed"})

                  }
                }

                this.dataSource1 = new MatTableDataSource(this.displayServices);
                this.dataSource1.paginator = this.paginator;
                this.dataSource1.sort = this.sort;
                this.loading = false;





            })

          }

        }
     },

      (err: any) => {
       console.log(err);
      }
      );







  }

  showbuttons = false;
  fullAddress;


/*

   firstName: '',
      lastName: '',
      middleName: '',
      email : '',
      dateOfBirth : '',
      state : '',
      city : '',
      country : '',
      houseApt : '',
      streetAddress : '',
      phoneNumber : '',
      zipcode : '',
      socialSecurityNumber : '',
      pid : '1',
      packageIds : []

*/

  firstCheck = false;
  lastCheck = false;
  emailCheck = false;
  dateCheck = false;
  houseCheck = false;
  streetCheck = false;
  zipCheck = false;



  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }



  orderReportData : any = {
    firstName : null,
    middleName : null,
    lastName : null,
    email : null,
    dateOfBirth : null,
    houseApt : null,
    streetAddress : null,
    phoneNumber : null,
    zipcode : null,
    socialSecurityNumber : null,
    country : '',
    state : '',
    city : '',
    orderComment : null

  }
  fieldMsgs;
  checkfieldstatus = false
  updateReportData()
  {
    if(!this.orderReportData.firstName)
    {
      this.fieldMsgs = "First Name is Required"
      this.checkfieldstatus = true
      this.firstCheck = true;
      this.lastCheck = false;
      this.emailCheck = false;
      this.dateCheck = false;
      this.houseCheck = false;
      this.streetCheck = false;
      this.zipCheck = false;
    }
    else if(!this.orderReportData.lastName)
    {
      this.fieldMsgs = "Last Name is Required"
      this.checkfieldstatus = true
      this.firstCheck = false;
      this.lastCheck = true;
      this.emailCheck = false;
      this.dateCheck = false;
      this.houseCheck = false;
      this.streetCheck = false;
      this.zipCheck = false;
    }
    else if(!this.orderReportData.email)
    {
      this.fieldMsgs = "Email is Required"
      this.checkfieldstatus = true
      this.firstCheck = false;
      this.lastCheck = false;
      this.emailCheck = true;
      this.dateCheck = false;
      this.houseCheck = false;
      this.streetCheck = false;
      this.zipCheck = false;
    }
    else if(!this.orderReportData.dateOfBirth)
    {
      this.fieldMsgs = "Date of Birth is Required"
      this.checkfieldstatus = true
      this.firstCheck = false;
      this.lastCheck = false;
      this.emailCheck = false;
      this.dateCheck = true;
      this.houseCheck = false;
      this.streetCheck = false;
      this.zipCheck = false;
    }
    else if(!this.orderReportData.houseApt)
    {
      this.fieldMsgs = "House/Apt# is Required"
      this.checkfieldstatus = true
      this.firstCheck = false;
      this.lastCheck = false;
      this.emailCheck = false;
      this.dateCheck = false;
      this.houseCheck = true;
      this.streetCheck = false;
      this.zipCheck = false;
    }
    else if(!this.orderReportData.streetAddress)
    {
      this.fieldMsgs = "Street Address is Required"
      this.checkfieldstatus = true
      this.firstCheck = false;
      this.lastCheck = false;
      this.emailCheck = false;
      this.dateCheck = false;
      this.houseCheck = false;
      this.streetCheck = true;
      this.zipCheck = false;
    }
    else if(!this.orderReportData.zipcode)
    {
      this.fieldMsgs = "Zipcode is Required"
      this.checkfieldstatus = true
      this.firstCheck = false;
      this.lastCheck = false;
      this.emailCheck = false;
      this.dateCheck = false;
      this.houseCheck = false;
      this.streetCheck = false;
      this.zipCheck = true;
    }
    else
    {
      this.checkfieldstatus = false
      this.firstCheck = false;
      this.lastCheck = false;
      this.emailCheck = false;
      this.dateCheck = false;
      this.houseCheck = false;
      this.streetCheck = false;
      this.zipCheck = false;

      var orderId = localStorage.getItem("orderId")
      var ssn = (<HTMLInputElement>document.getElementById("user-ssn")).value;

      console.log(orderId)
      this.UserService.updateOrderReportFromAdmin(orderId, ssn)
      .then((result) => {
        console.log(result)
        if(result["responseMessage"] == "Order marked completed.")
        {
          localStorage.setItem("orderSnnUP", "yes")
          this._route.navigate(['/REPORT_MANAGEMENT'])

        }
      })
      .catch((err) => {
      });




    }
  }

  Countries = []
  States = []
  Cities = []
  onChangedCountry(e)
  {

  }

  onChangedState(e)
  {

  }

  onChangedCity(e)
  {

  }

  isFifteen = false;
  ngOnInit(): void {

    var orderdetailid;



        /*
                                      CLIENT SIDE ACCESS

      */

    if(localStorage.getItem("groupId") == "2")
    {


      this.showbuttons = false;
      this.isAdmin = false;



      this.fullname = localStorage.getItem("fullname");
      this.place = localStorage.getItem("place");
      this.email = localStorage.getItem("email");
      this.dob = localStorage.getItem("dob");
      this.zip = localStorage.getItem("zip");
      this.houseapt =  localStorage.getItem("houseApt");

      if(this.houseapt == 'undefined' || this.houseapt == '')
      {
        console.log(this.houseapt)
        this.fullAddress = this.place + ", " + this.zip
      }
      else
      {
        console.log(this.houseapt)
        this.fullAddress = this.houseapt + ", " + this.place + ", " + this.zip
      }

      this.orderId = localStorage.getItem("orderId");

      if(localStorage.getItem("status") == "Completed" || localStorage.getItem("status") == "Needs Attention")
      {
        this.showreportDoc = true;
      }
      else if(localStorage.getItem("status") == "In Progress")
      {
        this.isClient = true;
      }

      this.showGroup = true;


      this.UserService.getfindReportById(this.orderId).subscribe(data => {
        let code = JSON.stringify(data);
        const obj = JSON.parse(code);
        var orders = obj["responseObject"]
        for(var d  of orders["defaultConsentDocument"])
        {
          for(var d2 of orders["serviceMasterData"])
          {
            this.UserService.sendOrderDetailId = d2["orderDetailId"];
          }
          this.displayDocuments.push({"isDefault" : "Y","documentName" : d["documentName"], "documentId" : d["documentId"], "orderId" : orders["orderId"], "orderDetailId" : this.UserService.sendOrderDetailId })
        }


        for(var d of orders["serviceMasterData"])
        {

          if(typeof d["documentName"] == 'undefined')
          {
            this.displayDocuments.push({"isDefault" : "N","documentName" : d["serviceAlias"], "documentId" : d["documentId"], "orderId" : orders["orderId"], "orderDetailId" : d["orderDetailId"]})
          }
          else
          {
            this.displayDocuments.push({"isDefault" : "N","documentName" : d["documentName"], "documentId" : d["documentId"], "orderId" : orders["orderId"], "orderDetailId" : d["orderDetailId"]})

          }
          this.displayServices.push({"serviceAlias" : d["serviceAlias"], "orderDetailId" : d["orderDetailId"],  "orderId" : this.orderId, "status" : "Completed"})
         // this.UserService.sendOrderDetailId = d["orderDetailId"];
        }


        this.dataSource = new MatTableDataSource(this.displayDocuments);
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
        this.loading = false;

      })

    }
    else
    {

      var x  = localStorage.getItem("groupId")
      if(x == "3")
      {
       // this.showupLoadReport = true;
        this.showContent= true;
        this.showbuttons = true;
      }
      console.log(this.UserService.clientSideCheck)
      if(x == "3" || x == "4" || x == "309")
      {
        this.showGroup = true;
      }


      this.fullname = localStorage.getItem("fullname");
      this.place = localStorage.getItem("place");
      this.email = localStorage.getItem("email");
      this.dob = localStorage.getItem("dob");
      this.zip = localStorage.getItem("zip");
      this.houseapt =  localStorage.getItem("houseApt");
      if(this.houseapt == 'undefined' || this.houseapt == '' || this.houseapt == null)
      {
        console.log(this.houseapt)
        this.fullAddress = this.place + ", " + this.zip
      }
      else
      {
        console.log(this.houseapt)
        this.fullAddress = this.houseapt + ", " + this.place + ", " + this.zip
      }

      this.orderId = localStorage.getItem("orderId");

      console.log(this.UserService.groupId)


      if(localStorage.getItem("status") == "Completed" || localStorage.getItem("status") == "Needs Attention")
      {
        this.showreportDoc = true;
      }


        /*
                                      ADMIN SIDE ACCESS

      */

      if(x == "3")
      {
        this.isClientLegal = false;
        this.isAdminSide = true;


         this.orderReportData.firstName = localStorage.getItem("fname");
         this.orderReportData.lastName = localStorage.getItem("lname");
         this.orderReportData.email = localStorage.getItem("email");
         this.orderReportData.dateOfBirth= localStorage.getItem("dob");
         this.orderReportData.zipcode = localStorage.getItem("zip");
         this.orderReportData.houseApt =  localStorage.getItem("houseApt");
         this.orderReportData.streetAddress =  localStorage.getItem("place");
         this.orderReportData.phoneNumber =  localStorage.getItem("phoneNumber");
         this.orderReportData.middleName =  localStorage.getItem("middleName");
         this.orderReportData.socialSecurityNumber =  localStorage.getItem("ssn");
         this.orderReportData.orderComment =  localStorage.getItem("orderComment");

         console.log(this.orderReportData)



        this.UserService.getfindReportById(this.orderId).subscribe(data => {
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var orders = obj["responseObject"]
          console.log(orders)
          if(orders["status"] == 1)
          {
            this.showupLoadReport = false;
          }
          else
          {
            this.showupLoadReport = true;
          }

          for(var d  of orders["defaultConsentDocument"])
          {
            for(var d2 of orders["serviceMasterData"])
            {
              /// ----------------------------- check if you put break inside
              this.UserService.sendOrderDetailId = d2["orderDetailId"];
            }
            this.displayDocuments.push({"isDefault" : "Y","documentName" : d["documentName"], "documentId" : d["documentId"], "orderId" : orders["orderId"], "orderDetailId" : this.UserService.sendOrderDetailId })
          }




          for(var d of orders["serviceMasterData"])
          {




            if(typeof d["documentName"] == 'undefined')
            {
              this.displayDocuments.push({"isDefault" : "N","documentName" : d["serviceAlias"], "documentId" : d["documentId"], "orderId" : orders["orderId"], "orderDetailId" : d["orderDetailId"]})
            }
            else
            {
              this.displayDocuments.push({"isDefault" : "N","documentName" : d["documentName"], "documentId" : d["documentId"], "orderId" : orders["orderId"], "orderDetailId" : d["orderDetailId"]})

            }

            if(d["status"] == false)
              {
                this.displayServices.push({"serviceAlias" : d["serviceAlias"], "pkgSerMasterRelId" : d["pkgSerMasterRelId"],"orderDetailId" : d["orderDetailId"]  ,"orderId" : this.orderId, "status" : "Incomplete"})
              }
              else if(d["status"] == true)
              {
                this.displayServices.push({"serviceAlias" : d["serviceAlias"], "pkgSerMasterRelId" : d["pkgSerMasterRelId"], "orderDetailId" : d["orderDetailId"]  ,"orderId" : this.orderId, "status" : "Completed"})

              }
          }

        
          
          if(this.displayServices.length > 15)
          {
            document.getElementById("checkFifteen").style.display = ""
          }
          else
          {
            document.getElementById("checkFifteen").style.display = "none"
          }

          this.dataSource = new MatTableDataSource(this.displayDocuments);
       //   this.dataSource.paginator = this.paginator;
        //  this.dataSource.sort = this.sort;


          this.dataSource1 = new MatTableDataSource(this.displayServices);
          this.dataSource1.paginator = this.paginator;
          this.dataSource1.sort = this.sort;
          this.loading = false;

         
        })
      }
      else
      {

        /*
                                        LEGAL SIDE ACCESS

        */

        
        console.log(this.orderId)
          this.UserService.getfindReportById(this.orderId).subscribe(data => {
            let code = JSON.stringify(data);
            const obj = JSON.parse(code);
            var orders = obj["responseObject"]
            console.log(orders)
            for(var d  of orders["defaultConsentDocument"])
            {
              for(var d2 of orders["serviceMasterData"])
              {
                this.UserService.sendOrderDetailId = d2["orderDetailId"];
              }
              this.displayDocuments.push({"isDefault" : "Y","documentName" : d["documentName"], "documentId" : d["documentId"], "orderId" : orders["orderId"], "orderDetailId" : this.UserService.sendOrderDetailId })
            }


            for(var d of orders["serviceMasterData"])
            {

              if(typeof d["documentName"] == 'undefined')
              {
                this.displayDocuments.push({"isDefault" : "N","documentName" : d["serviceAlias"], "documentId" : d["documentId"], "orderId" : orders["orderId"], "orderDetailId" : d["orderDetailId"]})
              }
              else
              {
                this.displayDocuments.push({"isDefault" : "N","documentName" : d["documentName"], "documentId" : d["documentId"], "orderId" : orders["orderId"], "orderDetailId" : d["orderDetailId"]})

              }
              if(d["status"] == false)
              {
                this.displayServices.push({"serviceAlias" : d["serviceAlias"], "pkgSerMasterRelId" : d["pkgSerMasterRelId"],"orderDetailId" : d["orderDetailId"]  ,"orderId" : this.orderId, "status" : "Incomplete"})
              }
              else if(d["status"] == true)
              {
                this.displayServices.push({"serviceAlias" : d["serviceAlias"], "orderDetailId" : d["orderDetailId"]  ,"orderId" : this.orderId, "status" : "Completed"})

              }
            // this.UserService.sendOrderDetailId = d["orderDetailId"];
            }

              
            if(this.displayServices.length > 15)
            {
              this.isFifteen = true;
            }
            else
            {
              this.isFifteen = false;
            }

              
            if(this.displayServices.length > 15)
            {
              document.getElementById("checkFifteen").style.display = ""
            }
            else
            {
              document.getElementById("checkFifteen").style.display = "none"
            }

            this.dataSource = new MatTableDataSource(this.displayDocuments);
            this.dataSource1 = new MatTableDataSource(this.displayServices);
            this.dataSource1.paginator = this.paginator;
            this.dataSource1.sort = this.sort;
            this.loading = false;
          })
          this.showLegalButton = "legal";
         
        }

    }

  }


}
