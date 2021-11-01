import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as html2pdf from 'html2pdf.js';
import { UserService } from 'src/app/APIs/user/user.service';
import { LegalDocumentBllService } from '../service/legal-document-bll.service';
@Component({
  selector: 'app-legaldocs',
  templateUrl: './legaldocs.component.html',
  styleUrls: ['./legaldocs.component.scss']
})
export class LegaldocsComponent implements OnInit {
  public loading: boolean;
  isSignatureDone: boolean = true;
  myDate = new Date();
  isLoading$ = true;
  userDoc ='';
  type;
  fileName;
  staffSignature ='';
  decodedString;
  signature;
  userSignature;
  ipAddress;
  clientSignature: string = '';
  showOtherValues=[];
  constructor(private modal: NgbActiveModal,private UserService: UserService , private _ClientDocumentBllService : LegalDocumentBllService) { }

  ngOnInit(): void {





    this.UserService.getdocumentUser(this.UserService.clientData["userid"]).subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];

      console.log(getCountArray)


      // for(var d of getCountArray)
      // {
      //   if(d["userId"] == this.UserService.clientData["userid"])
      //   {
      //     if(d["documentString"] !== 'empty')
      //     {
      //       this.signature = d["documentString"];
      //       this.UserService.clientSignature = d["documentString"];
      //     }
      //   }
      // }

      for(var d of getCountArray)
      {
        if(this.UserService.documentStatus == 1)
        {
          if(d["documentName"] == "CBSV.pdf")
          {
            this.signature = d['documentString']
            this.userSignature = this.signature;
          }
        }
        else if(this.UserService.documentStatus == 2)
        {
          if(d["documentName"] == "SAT.pdf")
          {
            this.signature = d['documentString']
            this.userSignature = this.signature;
          }
        }
        else if(this.UserService.documentStatus == 3)
        {
          if(d["documentName"] == "MSA.pdf")
          {
            this.signature = d['documentString']
            this.userSignature = this.signature;
          }
        }



      }

       console.log( this.signature)
       if(this.signature) {
         this.clientSignature = this.signature.split('_')[0];
         this.ipAddress = this.signature.split('_')[1];
         this.showOtherValues = this.signature.split('_');
       }

/*
      console.log(this.UserService.documentStatus)
      if(this.UserService.documentStatus == 1)
      {
        console.log(getCountArray[0]['documentString'])
        this.signature = getCountArray[0]['documentString']
         this.userSignature = this.signature;
      }
      else if(this.UserService.documentStatus == 2)
      {
        this.signature = getCountArray[1]['documentString']
         this.userSignature = this.signature;
      }
      else if(this.UserService.documentStatus == 3)
      {
        if(this.UserService.documentStatus == 1)
        {
          if(d["documentName"] == "CBSV.pdf")
          {
            this.signature = d['documentString']
            this.userSignature = this.signature;
          }
        }
        else if(this.UserService.documentStatus == 2)
        {
          if(d["documentName"] == "SAT.pdf")
          {
            this.signature = d['documentString']
            this.userSignature = this.signature;
          }
        }
        else if(this.UserService.documentStatus == 3)
        {
          if(d["documentName"] == "MSA.pdf")
          {
            this.signature = d['documentString']
            this.userSignature = this.signature;
          }
        }
      }

      console.log(this.userSignature)
      */
      })
    }

    onBlurEvent(event) {
      let value = (<HTMLInputElement>document.getElementById("signature")).value;
      if(value) {
        this.isSignatureDone = false;
      }
       else {
         this.isSignatureDone = true;
       }
    }




 getLabel(key:string){
   let keyValue = '';
   for(let i=2; i<this.showOtherValues.length;i++) {
      if(this.showOtherValues[i].indexOf(key) > -1) {
        keyValue = this.showOtherValues[i].split('&')[1]
        break;
      }
   }
   return keyValue
 }

  close(){
    this.modal.close();
  }



  onEsignClick(){

  var signature = (<HTMLInputElement>document.getElementById("signature")).value;
  console.log(signature)



  this.loading = true;


  var element = document.getElementById('document');

  var opt = {
    margin: 1,
    filename: 'myfile.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  // New Promise-based usage:
  const pdfFile = html2pdf()
    .from(element)
    .set(opt)
    .output('datauristring')
      .then(async (pdfBase64) => {
        let pdf = decodeURIComponent(escape(pdfBase64));
        // const source = pdf;
        // const link = document.createElement('a');
        // link.href = source;
        // link.download = `data.pdf`;
        // link.click();

        let base64 = pdfBase64.split(';')[1];
        let ext = pdfBase64.split(';')[0].split('data:')[1];
        let bas64String = base64.split(',')[1];

        let blobString = await this.b64toBlob(bas64String, ext);


        // logic needed to assign different name of each document
        const file = new File([blobString], this.fileName, {

          type: 'application/pdf',
        });


        console.log('final file :', file);

        this.uploadFile(file , this.staffSignature)



      });

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


  uploadFile(file , signatureofStaff){
    this.loading = true;
    this._ClientDocumentBllService.upload(file, signatureofStaff).subscribe(
      (event: any) => {


       if (event.type === HttpEventType.UploadProgress) {
          console.log(Math.round((100 * event.loaded) / event.total));
          console.log('File Completely Uploaded Now');

          this.UserService.documentCheck = 1
        } else if (event instanceof HttpResponse) {
          console.log("Response while uploading :- ",event)
          this.close()

        }
     },

      (err: any) => {
       console.log(err);
      }
  );
  }

}


