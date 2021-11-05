import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { UserService } from 'src/app/APIs/user/user.service';


@Component({
  selector: 'app-consentform',
  templateUrl: './consentform.component.html',
  styleUrls: ['./consentform.component.scss']
})
export class ConsentformComponent implements OnInit {



  constructor(private route : ActivatedRoute, private UserService : UserService, private _route : Router,
    ) {



  }


  orderData : any = {
    firstName : null,
    middleName : null,
    lastName : null,
    email : null,
    date : null,
    orderId : null,
    zipcode : null,
    streetAddress : null,
    ssn : null,
    serviceMasterData : [],
    defaultConsentDocument : null,
    appDisclosureDocumentStatus : null,
    fcraDocumentStatus : null,


  }


  ssndata : any = {

    ssn : null

  }



/*
{
  "firstName":"Timothy",
  "middleName":"Test",
  "lastName":"Tracer",
  "email":"timothy@yuy.com",
  "phoneNumber":"12345",
  "houseApt":"1803",
  "streetAddress":"Norma",
  "date":"12-12-1994",
  "city":1,
  "state":2,
  "zipcode":"91502",
  "packageIds":[19],
  "socialSecurityNumber":"999999999"
}
*/



  orderId;
  isDisabled= true;
  ssn;
  msg = "Please Enter 9 Digit SSN"
  invalid = "Please Enter a Valid SSN"
  checkReport = false;
  checkSsn = false;


  app()
  {
    var length = (<HTMLInputElement>document.getElementById("user-SSNname")).value.length;
    if(length == 9)
    {
      this.checkReport = false;
      this.checkSsn = false;
      this.orderData.ssn = this.ssndata.ssn;
      this.ssn =this.ssndata.ssn;

      var regEx = /^\d{3}-?\d{2}-?\d{4}$/;
      var validssn = regEx.test(this.ssn);
      console.log(this.ssn)
      console.log(validssn)
      if (!validssn){
        this.checkSsn = true;
        this.checkReport = false;

      }
      else {
        this.UserService.consentData = this.orderData;
        this.UserService.updateOrderReport(this.orderData.orderId, this.ssn)
        .then((result) => {
          localStorage.setItem("consentDatainfo", JSON.stringify(this.orderData));

        })

        .catch((err) => {
          console.log(err);
          this.checkReport = false;
          this.checkSsn = false;

        });
      }
    }
    else
    {

      this.checkReport = true;
      this.checkSsn = false;
      console.log("Please enter 9 digit SSN")
    }



  }


  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
       // this.orderby = params.orderby;
        //console.log(this.orderby); // price


        console.log(params["orderId"])

        var x = params["orderId"]
        var y = atob(x)

        console.log(y)
        this.orderId = y;
        this.UserService.getfindReportById(y).subscribe(data =>{

          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var orders = obj["responseObject"]

          console.log(orders)


          this.orderData.firstName = orders["firstName"]
          this.orderData.lastName = orders["lastName"]
          this.orderData.middleName = orders["middleName"]
          this.orderData.email = orders["email"]
          this.orderData.date = orders["dateOfBirth"]
          this.orderData.streetAddress = orders["streetAddress"]
          this.orderData.zipcode = orders["zipcode"]
          this.orderData.orderId = orders["orderId"]
          this.orderData.serviceMasterData = orders["serviceMasterData"]
          this.orderData.defaultConsentDocument = orders["defaultConsentDocument"]
          this.orderData.fcraDocumentStatus = orders["fcraDocumentStatus"];
          this.orderData.appDisclosureDocumentStatus = orders["appDisclosureDocumentStatus"];


          console.log(orders["orderId"])
          console.log(this.orderData)
          console.log(orders["serviceMasterData"])



        })
      }
    );
  }

}
