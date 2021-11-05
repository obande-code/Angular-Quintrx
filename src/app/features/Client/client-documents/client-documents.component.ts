import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/APIs/user/user.service';
import { ClientDocumentBllService } from './service/client-document-bll.service';
import { ShowDocumentModalComponent } from './show-document-modal/show-document-modal.component';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { config } from 'src/app/Configs/Config';


@Component({
  selector: 'app-client-documents',
  templateUrl: './client-documents.component.html',
  styleUrls: ['./client-documents.component.scss']
})
export class ClientDocumentsComponent implements OnInit {
  delegateSign = false;
  viewer = 'mammoth';
  isLoading$: Observable<boolean>;

  file1;
  file2;
  face;
  apikey;
  files = [];
  showDelegate = false;
  isClient = true;




  constructor(private modal: NgbModal,public  _ClientDocumentBllService:ClientDocumentBllService, private route : ActivatedRoute,
     private UserService : UserService, private http: HttpClient, private _route: Router,
     private auth: AuthenticationService,
     private conf : config) {
      this.isLoading$ = this._ClientDocumentBllService.isLoading$;
     }


     disableCBSV = false;
     disableSAT = false;
     disableMSA = false;










  getUserId;

  delegateMsg = "Email Sent Successfully"
  delegate(){
    this.showDocSign = false
    if (this.delegateSign == false) {
      this.delegateSign = true;
      this.disableCBSV = true;
      var btn1 = <HTMLInputElement> document.getElementById("buttonOne");
      var btn2 = <HTMLInputElement> document.getElementById("buttonTwo");
      var btn3 = <HTMLInputElement> document.getElementById("buttonThree");

      btn1.disabled = true;
      btn2.disabled = true;
      btn3.disabled = true;
    }
    else {
      this.delegateSign = false;
      var btn1 = <HTMLInputElement> document.getElementById("buttonOne");
      var btn2 = <HTMLInputElement> document.getElementById("buttonTwo");
      var btn3 = <HTMLInputElement> document.getElementById("buttonThree");

      btn1.disabled = false;
      btn2.disabled = false;
      btn3.disabled = false;
    }
  }

  sendEmail(){
    this.showDelegate = false;
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let name = (<HTMLInputElement>document.getElementById("name")).value;

   // var domain = email.substring(email.lastIndexOf("@") +1);
    
    let userId = localStorage.getItem("userId")

//console.log(email)
 //   console.log(userId)
 //   console.log(name)

    var getdomain = email.substring(email.lastIndexOf("@") +1);
    console.log(getdomain)

    if(!email || !this.conf.validateEmail(email))
    {
      this.msg = "Please Enter a valid Email Address"
      this.showDocSign = true
    }
    else if(getdomain != this.domainMatch)
    {
      this.msg = "Domain of email has to be the same as company email"
      this.showDocSign = true
    }
    else if(!name)
    {
      this.msg = "Please Enter the client name"
      this.showDocSign = true
    }
    else
    {
      this.showDocSign = false
      this.UserService.delegateAgreement(userId, email, name)
      .then((result) => {
  
        console.log(result)
        if (result["responseMessage"] == "Email sent successfully."){
          console.log("hi")
          this.showDelegate = true;
        }
  
      })
      .catch((err) => {
        console.log(err);
  
  
    });
    }


  




  }
  domainMatch;

  domainEmail;
  ngOnInit(): void {




    



    this.route.queryParams
    .subscribe(params => {
    
    // this.code = params["code"]
      

      if(typeof params["code"] == 'undefined')
      {
        var x  = this.auth.getAuthFromLocalStorage();
        console.log(x)
        var email = localStorage.getItem('USER_EMAIL');
        this.domainEmail = localStorage.getItem('USER_EMAIL');
        this.domainMatch = this.domainEmail.substring(this.domainEmail.lastIndexOf("@")+1);


        console.log(email)
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
        })
      }
      else
      {

        this.isClient = false;
        var code = params["code"]
        var newVar = atob(code)
  
        console.log(newVar)
  
        const match = newVar.match(/\d+/)
        console.log(match[0])
        localStorage.setItem("userId", match[0])
  
  
  
  
  
      // var email = x.slice()
        //var originalCode = x.slice(0, 35)
      // var decodedEmail = atob(email)
      // console.log(decodedEmail)
        //console.log(originalCode)
  
  
     //   var xx = newVar.slice(7,10)
      
        this.getUserId =  localStorage.getItem("userId")
  
        this.UserService.getdocumentUser(this.getUserId).subscribe(data =>
          {
            let toStringCount = JSON.stringify(data);
          const parseCount = JSON.parse(toStringCount);
          var getCountArray = parseCount["responseObject"];
          
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
          
        
        
      }
     


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
    this.showDocSign = false
    this.showDelegate = false;
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
    this.showDocSign = false
    this.showDelegate = false;

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


msg;
showDocSign = false

  redirect() {
    this.showDelegate = false;
    this.showDocSign = false
    var checkDocStatus;
    this.UserService.getdocumentUser(this.getUserId).subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];

      console.log(getCountArray)

      for (var x of getCountArray) {



        if (x["documentName"] == "CBSV.pdf") {
          if(x["status"] == '1') {
            checkDocStatus = true;
          }
          else
          {
            checkDocStatus = false;
            break;
          }
        }
        else if (x["documentName"] == "SAT.pdf") {
          if(x["status"] == '1') {
            checkDocStatus = true;
          }
          else
          {
            checkDocStatus = false;
            break;
          }
        }
        else if (x["documentName"] == "MSA.pdf") {
          if(x["status"] == '1') {
            checkDocStatus = true;
          }
          else
          {
            checkDocStatus = false;
            break;
          }
        }
      }
      console.log(checkDocStatus)
      if(checkDocStatus == true)
      {
        this._route.navigate(['/HOME']);
      }
      else
      {
        this.msg = "Please Sign all the documents."
        this.showDocSign = true
      }
      })
  //
  }

}
