import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/APIs/user/user.service';
import { ClientDocumentBllService } from '../../Client/client-documents/service/client-document-bll.service';
import * as html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consentdocs',
  templateUrl: './consentdocs.component.html',
  styleUrls: ['./consentdocs.component.scss']
})
export class ConsentdocsComponent implements OnInit {

  constructor(private clientbill : ClientDocumentBllService, private sanitizer: DomSanitizer,
    private UserService : UserService, private _route : Router) { }

  downloadURL;
  dataHtml;
  orderDetailId;
  status = 2;
  isLoading$ = false;


  sign()
  {


    if(this.isDoc == true)
    {
      this.fieldMsgs = "Unable to sign. Document not found"
      this.isDoc = true;
      this.isLoading$ = false
    }
    else
    {
      this.isDoc = false;
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

      console.log(this.orderDetailId)
      console.log(this.status)

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


  isDoc = false;
  fieldMsgs;
  ngOnInit(): void {

    console.log(this.UserService.consentData["serviceMasterData"])
    /*
    for(var d of this.UserService.consentData["serviceMasterData"])
    {
      //console.log(d["orderDetailId"])
      this.orderDetailId = d["orderDetailId"]
     // this.status = d["status"]
    }
    */

     // var downloadURL
      this.UserService.getDocTemplate(this.UserService.tempId).subscribe((data) => {
        //var blob
        var blob = new Blob([data], {type: 'application/pdf'});
        if(blob.size < 100)
        {
          this.fieldMsgs = "Document is not available to sign"
          this.isDoc = true;
        }
        else
        {
          this.dataHtml = this.sanitizer.bypassSecurityTrustHtml(data);
        }
      //console.log(data)
        //this.downloadURL = window.URL.createObjectURL(data);
       // window.open(downloadURL, '_blank')
       // var link = document.createElement('a');
       // console.log(link)
       // (<HTMLInputElement>document.getElementById("sign-CBSV")).src = this.downloadURL;

       // this.dataHtml = data;

       

       // link.href = downloadURL;
        //window.open(link.innerHTML, '_blank')
       // link.download = "help.pdf";
       // link.click();

      });






  }

}
