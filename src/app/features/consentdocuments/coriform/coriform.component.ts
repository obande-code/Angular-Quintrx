import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/APIs/user/user.service';
import { ClientDocumentBllService } from '../../Client/client-documents/service/client-document-bll.service';
import * as html2pdf from 'html2pdf.js';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-coriform',
  templateUrl: './coriform.component.html',
  styleUrls: ['./coriform.component.scss']
})
export class CoriformComponent implements OnInit {

  constructor(private UserService : UserService, private _route : Router, private clientbill : ClientDocumentBllService) { }

  public isLoading$ :boolean;
  fieldMsgs;
  isDoc = false;
  showMsg = false;
  msg;


  
  disclosureData : any ={
    firstname : null,
    lastname : null,
    dob : null,
    ssn : null,
    address : null,
    city : null,
    state : null,
    zip : null,

  }

  myDate = new Date();
  newDate  = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');

  sign()
  {

    var checkZeros = /^[0]+$/

    this.showMsg = false;

    if(!this.disclosureData.firstname)
    {
      this.msg = "Please enter your first name"
      this.showMsg = true;
    }
    else if(!this.disclosureData.lastname)
    {
      this.msg = "Please enter your last name"
      this.showMsg = true;
    }
    else if(!this.disclosureData.dob)
    {
      this.msg = "Please enter your date of birth"
      this.showMsg = true;
    }
    else if(!this.disclosureData.ssn || checkZeros.test(this.disclosureData.ssn))
    {
      this.msg = "Please enter the valid last 6 digit of ssn"
      this.showMsg = true;
    }
    else if(!this.disclosureData.address || checkZeros.test(this.disclosureData.address))
    {
      this.msg = "Please enter a valid address"
      this.showMsg = true;
    }
    else if(!this.disclosureData.city)
    {
      this.msg = "Please enter the city name"
      this.showMsg = true;
    }
    else if(!this.disclosureData.state)
    {
      this.msg = "Please enter the state name"
      this.showMsg = true;
    }
    else if(!this.disclosureData.zip)
    {
      this.msg = "Please enter the zipcode"
      this.showMsg = true;
    }
    else
    {

      this.showMsg = false;
        
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

  savedData;
  ngOnInit(): void {

    
    if(localStorage.getItem("consentDatainfo"))
    {
      this.savedData = JSON.parse(localStorage.getItem("consentDatainfo") || '')
      console.log(this.savedData)

     // this.disclosureData.name = this.savedData["firstName"] + " " + this.savedData["lastName"]
      this.disclosureData.firstname = this.savedData["firstName"]
      this.disclosureData.lastname = this.savedData["lastName"]
      this.disclosureData.address = this.savedData["streetAddress"]
      this.disclosureData.zipcode = this.savedData["zipcode"]
     // this.disclosureData.ssn = this.savedData["ssn"]
      
    //  let s  = formatDate(this.savedData["date"], 'mm/dd/yyyy', 'en-US')
      //console.log(s)

      //this.disclosureData.dob = s

    }
  }

}
