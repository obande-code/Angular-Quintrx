import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientDocumentBllService } from '../service/client-document-bll.service';
import * as html2pdf from 'html2pdf.js';

import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { UserService } from 'src/app/APIs/user/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';

@Component({
  selector: 'app-show-document-modal',
  templateUrl: './show-document-modal.component.html',
  styleUrls: ['./show-document-modal.component.scss'],
  providers: [DatePipe],
})
export class ShowDocumentModalComponent implements OnInit {
  ipAddress
  public loading: boolean;
  submitFlag;
  savedValues = null;
  errorshow = false;
  errorshow2 = false;
  errorshow3 = false;
  errorshow4 = false;
  errorshow5 = false;
  errorshow6 = false;
  errorshow7 = false;


  myDate = new Date();

  newDate  = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');

  viewer = 'mammoth';
  isSignatureDone: boolean = true;
  none = 'all';
  filesToUpload = [];
  @Input() type;
  @Input() fileName;
  @ViewChild('document', { static: false }) document: ElementRef;
  encodedString: string;
  clSign: any;
  companyType: string = '';
  paymentType: string = '';
  idArray = ['corporation', 'office', 'providing', 'clientlegalName', 'clientlegalAddress', 'clientlegalCity',
    'clientlegalState', 'clientlegalZip', 'clientlegalAttention', 'clientlegalEmail',
    'clientName', 'clientAttention', 'clientTitle', 'clientAddress',
    'clientCity', 'clientState', 'clientZip', 'clientEmail', 'clientphoneNumber', 'compName', 'compBus',
    'comAdd', 'compCity', 'compState', 'compZip', 'compPhone', 'compFax', 'compEmail', 'compBussType',
    'compEmp', 'compAdd1', 'compAdd2', 'compType', 'clientCompYear',  'clientCompFax', 'authName', 'authTitle', 'authSig',
    'authDate', 'exhibitCName', 'exhibitCTitle', 'exhibitCDate', 'exhibitDName', 'exhibitDTitle', 'exhibitDSig', 'exhibitDDate',
    'exhibitDTel', 'exhibitDEmail'
  ]
  idArrayOpt = ['corpName', 'corpAdd', 'corpCity', 'corpState', 'corpZip', 'corpPhone', 'corpFax', 'corpEmail',
  'primaryName', 'primarySsn', 'primaryEmail', 'method',
  'contactName', 'contactTitle', 'contactPhone', 'contactFax', 'contactEmail', 'contactAdd', 'contactCity', 'contactState', 'contactZip',
  'bankName', 'bankContact', 'bankAdd', 'bankCity', 'bankState', 'bankZip', 'bankPhone', 'bankFax', 'bankEmail', 'accountDate', 'accountType', 'accountNum']
  constructor(
    private modal: NgbActiveModal,
    public _ClientDocumentBllService: ClientDocumentBllService,
    private http: HttpClient,
    private UserService : UserService,
    private router: Router,
    private auth : AuthenticationService
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

    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      // console.log('th data', data);
       this.ipAddress = data.ip
      })


  }

  onBlurEvent(event) {

    let value = (<HTMLInputElement>document.getElementById("signature")).value;
     console.log(value);
    if(value) {
      this.isSignatureDone = false;
    }
     else {
       this.isSignatureDone = true;
     }
  }

  close() {
    this.modal.close();
    this._ClientDocumentBllService.selectedDocument = '';
  }

  getRadio(type: string) {
     console.log(type);
     this.companyType = type;
  }
  getPaymentMethod(methodType: string) {
    this.paymentType = methodType

  }
  OnInput(event: any) {
    if ((event.target.value).toString().slice(0, 3) === '000') {
      this.errorshow = true;
    }
    else {
      this.errorshow = false;
    }
  }
  OnInput2(event: any) {
    if ((event.target.value).toString().slice(0, 3) === '000') {
      this.errorshow2 = true;
    }
    else {
      this.errorshow2 = false;
    }
  }
  OnInput3(event: any) {
    if ((event.target.value).toString().slice(0, 3) === '000') {
      this.errorshow3 = true;
    }
    else {
      this.errorshow3 = false;
    }
  }
  OnInput4(event: any) {
    if ((event.target.value).toString().slice(0, 3) === '000') {
      this.errorshow4 = true;
    }
    else {
      this.errorshow4 = false;
    }
  }
  OnInput5(event: any) {
    if ((event.target.value).toString().slice(0, 3) === '000') {
      this.errorshow5 = true;
    }
    else {
      this.errorshow5 = false;
    }
  }
  OnInput6(event: any) {
    if ((event.target.value).toString().slice(0, 3) === '000') {
      this.errorshow6 = true;
    }
    else {
      this.errorshow6 = false;
    }
  }
  OnInput7(event: any) {
    if ((event.target.value).toString().slice(0, 3) === '000') {
      this.errorshow7 = true;
    }
    else {
      this.errorshow7 = false;
    }
  }


  async uploadFiles() {
    this.loading = true
    let valueArray = [];
    let id
    if(this.type === 2) {

    for(let m=0; m<this.idArray.length; m++) {
       let idValue = '';
       if (this.idArray[m] === 'compType' || this.idArray[m] === 'method'){
         idValue = this.idArray[m];
       } else {
         idValue = (<HTMLInputElement>document.getElementById(this.idArray[m])).value;
       }

       var  isValueFoundEmpty = '';

       if(!idValue){
         isValueFoundEmpty =(<HTMLInputElement>document.getElementById(this.idArray[m])).name;
         id = (<HTMLInputElement>document.getElementById(this.idArray[m]));
         this.loading = false
         break;
       } else {
         if(this.idArray[m] === 'compType') {

           if (!this.companyType) {
              isValueFoundEmpty = "Company Type"
              this.loading = false
              break;
            } else {
              id.style.borderColor = "";
              valueArray.push(this.idArray[m] + '&' +this.companyType)
            }

         }
           else {
             id = (<HTMLInputElement>document.getElementById(this.idArray[m]));
             id.style.borderColor = "";
             valueArray.push(this.idArray[m] + '&' +(<HTMLInputElement>document.getElementById(this.idArray[m])).value)
           }
       }
      }

      if(isValueFoundEmpty) {
        if(id){
          id.style.borderColor = "red";
          this.scrollTo(id)
        }

        alert("Please Enter "+isValueFoundEmpty)
        return;
      }
      for(var i in this.idArrayOpt) {
         if (this.idArrayOpt[i] === 'method' && this.paymentType) {

              valueArray.push(this.idArrayOpt[i] + '&' + this.paymentType)

           } else {
               if((<HTMLInputElement>document.getElementById(this.idArrayOpt[i])) && (<HTMLInputElement>document.getElementById(this.idArrayOpt[i])).value){
                valueArray.push(this.idArrayOpt[i] + '&' +(<HTMLInputElement>document.getElementById(this.idArrayOpt[i])).value)
              }
           }

      }

    }
   // console.log(valueArray.length)

    var signature = (<HTMLInputElement>document.getElementById("signature")).value;
    console.log(signature)

    console.log(this.name)


    var element = document.getElementById('document' + (this.type + 1));


    //let encodedString = btoa(unescape(encodeURIComponent(element.innerHTML)));
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
         
         this._ClientDocumentBllService.upload(file, signature, this.ipAddress, valueArray).subscribe(
           (event: any) => {

            if (event.type === HttpEventType.UploadProgress) {
               console.log(Math.round((100 * event.loaded) / event.total));
               console.log('File Completely Uploaded Now');
               this.checkDocument();
               this.UserService.documentCheck = 1
             } else if (event instanceof HttpResponse) {
              this._ClientDocumentBllService.count++;
              if (this.type === 0) {
                this._ClientDocumentBllService.documentOne = true;
              }
              if(this.type === 1) {
                this._ClientDocumentBllService.documentTwo = true;
              }

              if(this.type === 2) {
                this._ClientDocumentBllService.documentThree = true;
              }
              console.log('count is .....', this._ClientDocumentBllService.count);
              if(this._ClientDocumentBllService.count === 3) {
                this._ClientDocumentBllService.count = 0;
                //this.router.navigate(['/HOME'])
              }
               console.log("Response while uploading : ",event)

              if(event["body"]["responseObject"]["documentName"] == "CBSV.pdf")
              {
                var element = <HTMLInputElement> document.getElementById("buttonOne");

                element.disabled = true;
              }
              else if(event["body"]["responseObject"]["documentName"] == "SAT.pdf")
              {
                var element = <HTMLInputElement> document.getElementById("buttonTwo");

                element.disabled = true;
              }
              else if(event["body"]["responseObject"]["documentName"] == "MSA.pdf")
              {
                var element = <HTMLInputElement> document.getElementById("buttonThree");

                element.disabled = true;
              }


              console.log(element)
               this.close()
             }
          },

           (err: any) => {
            console.log(err);
            this.loading = false
           }
       );
        //this.close();
         //this.redirect();
       });
  }

  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }






  checkDocument(){
    if (this.UserService.documentStatus == 1) {
       //this.count +=1;
       //document.getElementById("check1").style.display="";
    }
    else if (this.UserService.documentStatus == 2) {
      // this.count +=1;
       //document.getElementById("check2").style.display="";
    }
    else if (this.UserService.documentStatus == 3) {
      // this.count +=1;
       //document.getElementById("check3").style.display="";
    }


  }

  // redirect(){
  //   console.log("IN REDIRECT")
  //   if (document.getElementById("check1").style.display="" ) {
  //     console.log("check1 is visible")
  //      if (document.getElementById("check2").style.display="") {
  //        if (document.getElementById("check3").style.display="") {
  //          console.log("ALL CHECKS VISIBLE")
  //        }
  //     }
  //   }
  // }

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
    let response = await fetch(this._ClientDocumentBllService.documents[index]);
    let data = await response.blob();
    let metadata = {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    let file = new File(
      [data],
      this._ClientDocumentBllService.fileNames[index],
      metadata
    );
    this.filesToUpload.push(file);
  }

}
