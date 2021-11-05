import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';
import { ClientDocumentBllService } from '../../Client/client-documents/service/client-document-bll.service';
import * as html2pdf from 'html2pdf.js';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-employementverify',
  templateUrl: './employementverify.component.html',
  styleUrls: ['./employementverify.component.scss']
})
export class EmployementverifyComponent implements OnInit {

  constructor(private UserService : UserService, private _route : Router, private clientbill : ClientDocumentBllService ) { }
  public isLoading$ :boolean;
  fieldMsgs;
  isDoc = false;
  showMsg = false;
  msg;

  
  disclosureData : any ={
    companyName : null,
    jobtitle : null,
    supervisor : null,
    address : null,
    city : null,
    state : null,
    country : null,
    fromdate : null,
    todate : null,
    reason : null,
    name : null,
    signature : null,
    date : null


  }

  myDate = new Date();
  newDate  = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');


  sign()
  {
      
    if(!this.disclosureData.companyName)
    {
      this.msg = "Please enter the company name"
      this.showMsg = true
    }
    else if(!this.disclosureData.jobtitle)
    {
      this.msg = "Please print your Job Title"
      this.showMsg = true
    }
    else if(!this.disclosureData.supervisor)
    {
      this.msg = "Please enter the supervisor name"
      this.showMsg = true
    }
    else if(!this.disclosureData.address)
    {
      this.msg = "Please enter the company address"
      this.showMsg = true
    }
    else if(!this.disclosureData.city)
    {
      this.msg = "Please enter the city name"
      this.showMsg = true
    }
    else if(!this.disclosureData.state)
    {
      this.msg = "Please enter the state name"
      this.showMsg = true
    }
    else if(!this.disclosureData.country)
    {
      this.msg = "Please enter the country name"
      this.showMsg = true
    }
    else if(!this.disclosureData.fromdate)
    {
      this.msg = "Please enter the from date"
      this.showMsg = true
    }
    else if(!this.disclosureData.todate)
    {
      this.msg = "Please enter the to date"
      this.showMsg = true
    }
    else if(!this.disclosureData.reason)
    {
      this.msg = "Please enter a reason to leave"
      this.showMsg = true
    }
    else if(!this.disclosureData.name)
    {
      this.msg = "Please print your name"
      this.showMsg = true
    }
    else if(!this.disclosureData.signature)
    {
      this.msg = "Please print your signature"
      this.showMsg = true
    }
    else if(!this.disclosureData.date)
    {
      this.msg = "Please print enter the date"
      this.showMsg = true
    }
    else
    {

    
    
   
      this.showMsg = false


      let data = document.getElementById("sign-CBSV");

      var opt = {
        margin: 1,
        filename: 'myfile.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' },
      };
  
  
  
      const pdfFile = html2pdf()
      .from(data)
      .set(opt)
      .output('datauristring')
      .then(async (pdfBase64) => {
        let base64 = pdfBase64.split(';')[1];
        let ext = pdfBase64.split(';')[0].split('data:')[1];
        let bas64String = base64.split(',')[1];
  
        let blobString = await this.b64toBlob(bas64String, ext);
        console.log(blobString)
        const file = new File([blobString], this.UserService.documentName, {
          type: 'application/pdf',
        });
  
        //console.log(file.size)
  
  
        //console.log(file)
  
     //   console.log(this.orderDetailId)
      //  console.log(this.status)
  
        console.log(this.UserService.docType)
        this.clientbill.uploadConsent(file, this.UserService.neworderDetailId, this.UserService.docType).subscribe(
          (event: any) => {
  
            console.log("hello")
  
           if (event.type === HttpEventType.UploadProgress) {
              console.log(Math.round((100 * event.loaded) / event.total));
              console.log('File Completely Uploaded Now');
              this.isLoading$ = true;
  
              console.log(this.UserService.neworderDetailId)
  
            } else if (event instanceof HttpResponse) {
              console.log("Response while uploading :- ",event)
              
  
  
  
              if(event["body"]["responseMessage"] == "Something Went Wrong")
              {
                console.log("Error While hitting API")
  
                this.fieldMsgs = "Failed to sign document"
                this.isDoc = true
                this.isLoading$ = false;
              }
              else
              {
                this.isDoc = false
                console.log("API Successfully hit")
                console.log(this.UserService.documentName)
  
  
                if(event["body"]["responseCode"] == 0)
                {
                  this.isLoading$ = false;
  
                
                /*
                    if(this.UserService.documentName == "Summary of Consumer Rights.pdf")
                    {
                      this.UserService.docStatusSummary = true;
  
  
                    }
                    else if(this.UserService.documentName == "application_disclosure_form.pdf")
                    {
                      this.UserService.docStatusApp = true;
                    }
                    else
                    {
                      this.UserService.docStatusServ = true;
  
                    }
                    console.log(this.UserService.docStatusSummary)
                    console.log(this.UserService.docStatusApp)
                    console.log(this.UserService.docStatusServ)
                    */
                   
                    this.UserService.getfindReportById(this.UserService.consentorderId).subscribe(data =>{
  
                      let code = JSON.stringify(data);
                      const obj = JSON.parse(code);
                      var orders = obj["responseObject"]
            
                      console.log(orders)
                      var status;
                      for(var d of orders["serviceMasterData"])
                      {
                        if(d["consentDocumentStatus"] == true)
                        {
                          status = true;
                        } 
                        else
                        {
                          status = false;
                          break;
                        }
                      }
  
                                          
                    if((orders["fcraDocumentStatus"] == true) && (orders["appDisclosureDocumentStatus"] == true) &&(status == true))
                    {
                      this._route.navigate(['/thank-submission'])
                      //console.log("all true")
                    }
                    else
                    {
                      this._route.navigate(['/application-disclosure'])
                    }
                    })
                }
              }
            }
         },
  
          (err: any) => {
           console.log(err);
          }
          );
  
        });
      }
      
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


  ngOnInit(): void {
  }

}
