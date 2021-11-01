import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/APIs/user/user.service';
import { ClientDocumentBllService } from './service/client-document-bll.service';
import { ShowDocumentModalComponent } from './show-document-modal/show-document-modal.component';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-documents',
  templateUrl: './client-documents.component.html',
  styleUrls: ['./client-documents.component.scss']
})
export class ClientDocumentsComponent implements OnInit {
  viewer = 'mammoth';
  isLoading$: Observable<boolean>;

  file1;
  file2;
  face;
  apikey;
  files = [];




  constructor(private modal: NgbModal,public  _ClientDocumentBllService:ClientDocumentBllService,
     private UserService : UserService, private http: HttpClient, private _route: Router,
     private auth: AuthenticationService) {
      this.isLoading$ = this._ClientDocumentBllService.isLoading$;
     }


     disableCBSV = false;
     disableSAT = false;
     disableMSA = false;










  getUserId;

  ngOnInit(): void {



    var x  = this.auth.getAuthFromLocalStorage();
    console.log(x)


    var email = localStorage.getItem('USER_EMAIL');
    //console.log(localStorage.getItem('USER_EMAIL'))

    this.auth.getUserGroupRelationDetailByEmail(email).subscribe(x => {
      console.log(x["responseObject"]["userId"])



      this.getUserId = x["responseObject"]["userId"]
      localStorage.setItem("userId", this.getUserId)


      //  console.log(getUserId)


        this.UserService.getdocumentUser(this.getUserId).subscribe(data =>
        {
          let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];

        console.log(getCountArray)

        for (let x of getCountArray) {
          if (x["documentName"] == "CBSV.pdf") {
            if(x["status"] == '1') {

              var element = <HTMLInputElement> document.getElementById("buttonOne");

              element.disabled = true;
            }
          }
          else if (x["documentName"] == "SAT.pdf") {
            if(x["status"] == '1') {

              var element = <HTMLInputElement> document.getElementById("buttonTwo");

              element.disabled = true;
            }
          }
          else if (x["documentName"] == "MSA.pdf") {
            if(x["status"] == '1') {

              var element = <HTMLInputElement> document.getElementById("buttonThree");

              element.disabled = true;
            }
          }
        }
        })
        //this.getIPAddress();
        console.log(this.UserService)
    })
  }

  getFile1(e){
    this.file1 = e.target.files[0];
    console.log(this.file1)

  }

  getFile2(e){
    this.file2 = e.target.files[0];
    console.log(this.file2)
  }

  uploadFiles() {

    this._ClientDocumentBllService.uploadId(this.file1, this.file2).subscribe(
      (event: any) => {

       if (event.type === HttpEventType.UploadProgress) {
          console.log(Math.round((100 * event.loaded) / event.total));
          console.log('File Completely Uploaded Now');


        } else if (event instanceof HttpResponse) {
          console.log("Response while uploading : ",event)


        }
     },

      (err: any) => {
       console.log(err);
      }
  );

  }







  openDocument(documentNo,name,status){

     this._ClientDocumentBllService.selectedDocument=this._ClientDocumentBllService.documents[documentNo];
     const modalRef = this.modal.open(ShowDocumentModalComponent, {
      size: 'xl',
    });
     modalRef.componentInstance.type = documentNo;
     modalRef.componentInstance.fileName = name;
     this.UserService.documentStatus = status;

    console.log("hi")


     this.UserService.getdocumentUser(this.getUserId).subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];

      console.log(getCountArray)

      for (let x of getCountArray) {
        if (x["documentName"] == "CBSV.pdf") {
          if(x["status"] == '1' || x["status"] == '2') {
            this.disableCBSV = true;
          }
        }
        else if (x["documentName"] == "SAT.pdf") {
          if(x["status"] == '1' || x["status"] == '2') {
            this.disableSAT = true;
          }
        }
        else if (x["documentName"] == "MSA.pdf") {
          if(x["status"] == '1' || x["status"] == '2') {
            this.disableMSA = true;
          }
        }
      }
      })
  }




  redirect() {
    this._route.navigate(['/HOME']);
  }

}
