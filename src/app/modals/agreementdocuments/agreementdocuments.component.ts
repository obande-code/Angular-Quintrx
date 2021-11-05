import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/APIs/user/user.service';
import jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ClientDocumentBllService } from 'src/app/features/Client/client-documents/service/client-document-bll.service';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-agreementdocuments',
  templateUrl: './agreementdocuments.component.html',
  styleUrls: ['./agreementdocuments.component.scss']
})
export class AgreementdocumentsComponent implements OnInit {

  constructor(private modal: NgbActiveModal,
     private UserService : UserService, private clientbill : ClientDocumentBllService,private sanitizer: DomSanitizer) {}

  close() {
    this.modal.close();
  }


  isDocument = false;
  dataHtml;
  ngOnInit(): void {


    //console.log(this.UserService.pagestatus)
    //console.log(this.UserService.orderDetailId)

    if(this.UserService.pagestatus == 1)
    {



      this.UserService.getAgreeMentPdf(this.UserService.documentUserRelId).subscribe((data) => {
        //var blob

        if(data["size"] < 100)
        {

         // <HTMLInputElement> document.getElementById("docNotFound");
         document.getElementById("sign-CBSV").style.display="none"
         document.getElementById("docNotFound").style.display=""



        }
        else
        {
          var blob = new Blob([data], {type: 'application/pdf'});
      
          var downloadURL = window.URL.createObjectURL(blob);
         // window.open(downloadURL, '_blank')
          var link = document.createElement('a');
         // console.log(link)
          (<HTMLInputElement>document.getElementById("sign-CBSV")).src = downloadURL;
  
  
  
          //link.innerHTML = downloadURL;
          //window.open(link.innerHTML, '_blank')
          //link.download = "help.pdf";
         // link.click();
        }
      

      });










    }
    else if(this.UserService.pagestatus == 2)
    {

      this.UserService.getPDF(this.UserService.orderDetailId).subscribe((data) => {
        //var blob
        if(data["size"] < 100)
        {

         // <HTMLInputElement> document.getElementById("docNotFound");
         document.getElementById("sign-CBSV").style.display="none"
         document.getElementById("docNotFound").style.display=""



        }
        else
        {
          var blob = new Blob([data], {type: 'application/pdf'});
      
          var downloadURL = window.URL.createObjectURL(blob);
          //window.open(downloadURL, '_blank')
          var link = document.createElement('a');
          (<HTMLInputElement>document.getElementById("sign-CBSV")).src = downloadURL;
         // link.href = downloadURL;
         // link.download = "help.pdf";
         // link.click();
        }
        
       

      });
    }
    else if(this.UserService.pagestatus == 3)
    {
      //console.log("hi")

      this.UserService.getPDF(this.UserService.orderDetailId).subscribe((data) => {
        //var blob


        if(data["size"] < 100)
        {

         // <HTMLInputElement> document.getElementById("docNotFound");
         document.getElementById("sign-CBSV").style.display="none"
         document.getElementById("docNotFound").style.display=""



        }
        else
        {
          var blob = new Blob([data], {type: 'application/pdf'});
      
          var downloadURL = window.URL.createObjectURL(blob);
         // window.open(downloadURL, '_blank')
          var link = document.createElement('a');
          (<HTMLInputElement>document.getElementById("sign-CBSV")).src = downloadURL;
         // link.href = downloadURL;
         // link.download = "help.pdf";
         // link.click();
        }
       
      
      });
    }
    else if(this.UserService.pagestatus == 20)
    {
       if(this.UserService.isDefault == true)
       {
         //console.log(this.UserService.orderId)
         //console.log(this.UserService.documentName)
        this.UserService.getdefault(this.UserService.orderId, this.UserService.documentName).subscribe((data) => {
          //var blob
          console.log(data)

          if(data["size"] < 100)
          {

           // <HTMLInputElement> document.getElementById("docNotFound");
           document.getElementById("sign-CBSV").style.display="none"
           document.getElementById("docNotFound").style.display=""



          }
          else
          {
            var blob = new Blob([data], {type: 'application/pdf'});
        
            var downloadURL = window.URL.createObjectURL(blob);
           // window.open(downloadURL, '_blank')
            var link = document.createElement('a');
            (<HTMLInputElement>document.getElementById("sign-CBSV")).src = downloadURL;
           // link.href = downloadURL;
           // link.download = "help.pdf";
           // link.click();
          }
         
  
        });
       }
       else if(this.UserService.isDefault == false)
       {
         console.log(this.UserService.orderDetailId)
        this.UserService.getConsentPDf(this.UserService.orderDetailId).subscribe((data) => {
          console.log(data)
          if(data["size"] < 100)
          {
           // <HTMLInputElement> document.getElementById("docNotFound");
           document.getElementById("sign-CBSV").style.display="none"
           document.getElementById("docNotFound").style.display=""
          }
          else
          {
            var blob = new Blob([data], {type: 'application/pdf'});
        
            var downloadURL = window.URL.createObjectURL(blob);
           // window.open(downloadURL, '_blank')
            var link = document.createElement('a');
            (<HTMLInputElement>document.getElementById("sign-CBSV")).src = downloadURL;
           // link.href = downloadURL;
           // link.download = "help.pdf";
           // link.click();
          }
  
        });
       }
     
    
    }
    else  if(this.UserService.pagestatus == 10)
    {

    //  console.log(this.UserService.consentorderId)
      this.UserService.getConsolidatedReport(this.UserService.consolodatedORderID).subscribe((data) => {
        //var blob

        if(data["size"] < 100)
        {

         // <HTMLInputElement> document.getElementById("docNotFound");
         document.getElementById("sign-CBSV").style.display="none"
         document.getElementById("docNotFound").style.display=""

        }
        else
        {
          var blob = new Blob([data], {type: 'application/pdf'});
      
          var downloadURL = window.URL.createObjectURL(blob);
         // window.open(downloadURL, '_blank')
          var link = document.createElement('a');
          (<HTMLInputElement>document.getElementById("sign-CBSV")).src = downloadURL;
         // link.href = downloadURL;
         // link.download = "help.pdf";
         // link.click();
        }
     
      
      });
    }
    else  if(this.UserService.pagestatus == 70)
    {

    //  console.log(this.UserService.consentorderId)
      this.UserService.getDocTemplate1(this.UserService.documentId).subscribe((data) => {
        //var blob


        console.log(this.UserService.documentId)
        if(data["size"] < 100)
        {

         // <HTMLInputElement> document.getElementById("docNotFound");
         document.getElementById("sign-CBSV").style.display="none"
         document.getElementById("docNotFound").style.display=""



        }
        else
        {
        //  var blob = new Blob([data], {type: 'application/text'});
      
          var downloadURL = window.URL.createObjectURL(data);
         // window.open(downloadURL, '_blank')
          var link = document.createElement('a');
          (<HTMLInputElement>document.getElementById("sign-CBSV")).src = downloadURL;
          //link.href = downloadURL;
            //link.download = "help.pdf"
         // link.download = "help.pdf";
          //link.click();
        }
     
      
      });
    }
    else  if(this.UserService.pagestatus == 88)
    {

    //  console.log(this.UserService.consentorderId)
      this.UserService.getInvoiceDoc(this.UserService.invoiceId).subscribe((data) => {
        //var blob

        if(data["size"] < 100)
        {

         // <HTMLInputElement> document.getElementById("docNotFound");
         document.getElementById("sign-CBSV").style.display="none"
         document.getElementById("docNotFound").style.display=""

        }
        else
        {
          var blob = new Blob([data], {type: 'application/pdf'});
      
          var downloadURL = window.URL.createObjectURL(blob);
         // window.open(downloadURL, '_blank')
          var link = document.createElement('a');
          (<HTMLInputElement>document.getElementById("sign-CBSV")).src = downloadURL;
         // link.href = downloadURL;
         // link.download = "help.pdf";
         // link.click();
        }
     
      
      });
    }
    


  }

}
