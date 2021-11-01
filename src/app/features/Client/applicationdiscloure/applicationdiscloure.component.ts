import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';
import * as html2pdf from 'html2pdf.js';
import { ClientDocumentBllService } from '../client-documents/service/client-document-bll.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AgreementdocumentsComponent } from 'src/app/modals/agreementdocuments/agreementdocuments.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/*
{
  id : 42,
  name : "name"
}
{
  id : 43,
  name : "name"
}
*/


@Component({
  selector : './app-applicationdiscloure',
  templateUrl: './applicationdiscloure.component.html',
  styleUrls: ['./applicationdiscloure.component.scss']
})
  
export class ApplicationdiscloureComponent implements OnInit {

  constructor(private _route : Router, private UserService : UserService, private clientBill : ClientDocumentBllService, private modal : NgbModal) { }

  checkDoc1 = false;
  checkDoc2 = false;
  checkDoc3 = false;

  firstname;
  lastname;
  middlename;
  email;
  ssn;
  address;
  zipcode;
  dob;
  docData = [];

  orderId;
  docName;
  //showButtons = false;

  fileData : any = {
    file : null,
    orderId : null
  }


  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }


    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  signApp()
  {
    this.UserService.tempId = this.UserService.consentData["defaultConsentDocument"][1]["documentId"]
    this.UserService.documentName = "application_disclosure_form.pdf"

    this.UserService.docType = "application_disclosure_form.pdf"

    this.UserService.defaultCheck = 1;
    this._route.navigate(['/consentdocuments'])
  
  }

  signSummary()
  {
    console.log(this.UserService.consentData["defaultConsentDocument"]["42"])
    this.UserService.documentName = "Summary of Consumer Rights.pdf"
    this.UserService.docType ="Summary of Consumer Rights.pdf"
    this.UserService.defaultCheck = 1;
    this.UserService.tempId = this.UserService.consentData["defaultConsentDocument"][0]["documentId"]
    this._route.navigate(['/consentdocuments'])
  
  
  }

  signDoc(e)
  {
    console.log(e)
    /*
    for(var d of this.UserService.consentData["serviceMasterData"])
    {
      console.log(d["documentId"])
     // this.UserService.tempId = d["documentId"]
    }
    */
   this.UserService.neworderDetailId = e["orderDetailId"]
    this.UserService.tempId = e["documentId"]
    this.UserService.documentName = e["documentName"]
    this.UserService.docType = e["documentName"]


    this._route.navigate(['/consentdocuments'])
    
  }


  

  ngOnInit(): void {


    console.log(this.UserService.consentData)

/*
    this.firstname = this.UserService.consentData["firstName"]
    this.lastname = this.UserService.consentData["lastName"]
    this.middlename = this.UserService.consentData["middleName"]
    this.dob = this.UserService.consentData["date"]
    this.zipcode = this.UserService.consentData["zipcode"]
    this.address = this.UserService.consentData["streetAddress"]
    this.ssn = this.UserService.consentData["ssn"]
    this.email = this.UserService.consentData["email"]
    */

    this.orderId = this.UserService.consentData["orderId"]
    this.UserService.consentorderId = this.UserService.consentData["orderId"]

   // this.docData = this.UserService.consentData["serviceMasterData"]

    this.docName ="Sign "+ this.UserService.consentData["serviceMasterData"][0]["documentName"]
    this.UserService.documentName = this.UserService.consentData["serviceMasterData"][0]["documentName"] + ".pdf"


    console.log(this.UserService.consentData["serviceMasterData"][0]["consentDocumentStatus"])



    this.UserService.getfindReportById(this.UserService.consentorderId).subscribe(data =>{

      let code = JSON.stringify(data);
      const obj = JSON.parse(code);
      var orders = obj["responseObject"]
      this.docData = orders["serviceMasterData"]

      var status; 
      for(var d of orders["serviceMasterData"])
      {
        

        console.log( d["orderDetailId"])
        this.UserService.neworderDetailId = d["orderDetailId"]
        if(d["consentDocumentStatus"] == true)
        {
          status = true;
        } 
        else
        {
          status = false;
          break;
        }
        
       
      //  console.log( d["orderDetailId"])
      }
      console.log(this.docData)

     
      console.log( this.UserService.neworderDetailId)
                            
      if((orders["fcraDocumentStatus"] == true) && (orders["appDisclosureDocumentStatus"] == true) && (status == true))
      {
        this._route.navigate(['/thank-submission'])
        console.log("all true")
      }
      
    if(orders["fcraDocumentStatus"] == true)
    {
      this.checkDoc1 = true;
      console.log("summary")
    }
    if(orders["appDisclosureDocumentStatus"] == true)
    {
      this.checkDoc2 = true;
      console.log("App")
    }
    /*
    if(orders["serviceMasterData"][0]["consentDocumentStatus"] == true)
    {
      this.checkDoc3 = true;
      console.log("service")
    }
    */
    
  
  
  
      
  
    })
    

    



  }

}
