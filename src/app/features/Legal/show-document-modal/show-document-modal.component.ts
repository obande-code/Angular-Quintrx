import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LegalDocumentBllService } from '../service/legal-document-bll.service';
import * as html2pdf from 'html2pdf.js';

import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { UserService } from 'src/app/APIs/user/user.service';


@Component({
  selector: 'app-show-document-modal',
  templateUrl: './show-document-modal.component.html',
  styleUrls: ['./show-document-modal.component.scss'],
  providers: [DatePipe],
})
export class ShowClientDocument implements OnInit {
  ipAddress = '';
  submitFlag;
    savedValues = null;
  myDate = new Date();
  viewer = 'mammoth';
  none = 'all';
  filesToUpload = [];
  @Input() type;
  @Input() fileName;
  @ViewChild('document', { static: false }) document: ElementRef;
  encodedString: string;
  clSign: any;

  constructor(
    private modal: NgbActiveModal,
    public client: LegalDocumentBllService,
    private http: HttpClient,
    private UserService : UserService,
  ) {}



  signature = this.UserService.clientSignature


  get name() {
    if (!this.savedValues) {
      return '';
    }
    const { firstName, lastName, middleName } = this.savedValues;
    return `${firstName} ${middleName} ${lastName}`;
  }

  get address() {
    if (!this.savedValues) {
      return '';
    }
    const { houseApt, streetAddress, city, state, zipcode } = this.savedValues;
    return `${houseApt} ${streetAddress} ${city}, ${state}`;
  }

  ngOnInit(): void {
    //this.savedValues = JSON.parse(localStorage.getItem('savedForm') || '');
    console.log(this.type);
    this.createFile(0);
    this.createFile(1);
    this.createFile(2);
    this.getIPAddress();
  }


  getIPAddress()
  {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }



  close() {
    this.modal.close();
    this.client.selectedDocument = '';
  }


  async uploadFiles() {

    var signature = (<HTMLInputElement>document.getElementById("signature")).value;
    console.log(signature)

    console.log(this.name)
     var element = document.getElementById('document' + (this.type + 1));


   //this.encodedString = btoa(unescape(encodeURIComponent(element.innerHTML)));

   //localStorage.setItem('docString', this.encodedString);


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
         let base64 = pdfBase64.split(';')[1];
         let ext = pdfBase64.split(';')[0].split('data:')[1];
         let bas64String = base64.split(',')[1];

         let blobString = await this.b64toBlob(bas64String, ext);

         const file = new File([blobString], this.fileName, {
           type: 'application/pdf',
         });

         this.client.upload(file, signature).subscribe(
           (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
               console.log(Math.round((100 * event.loaded) / event.total));
               console.log('File Completely Uploaded Now');
               this.checkDocument();
               this.UserService.documentCheck = 1
             } else if (event instanceof HttpResponse) {
               console.log("Response while uploading :- ",event)
             }
          },
           (err: any) => {
            console.log(err);
           }
       );
         this.close();
         this.redirect();
       });
  }




  checkDocument(){
    if (this.UserService.documentStatus == 1) {
      document.getElementById("check1").style.display="";
    }
    else if (this.UserService.documentStatus == 2) {
      document.getElementById("check2").style.display="";
    }
    else if (this.UserService.documentStatus == 3) {
      document.getElementById("check3").style.display="";
    }
  }

  redirect(){
    console.log("IN REDIRECT")
    if (document.getElementById("check1").style.display="" ) {
      console.log("check1 is visible")
       if (document.getElementById("check2").style.display="") {
         if (document.getElementById("check3").style.display="") {
           console.log("ALL CHECKS VISIBLE")
         }
      }
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

  async createFile(index) {
    let response = await fetch(this.client.documents[index]);
    let data = await response.blob();
    let metadata = {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    let file = new File(
      [data],
      this.client.fileNames[index],
      metadata
    );
    this.filesToUpload.push(file);
  }
}
