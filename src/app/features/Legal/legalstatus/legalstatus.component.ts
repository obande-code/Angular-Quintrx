import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/APIs/user/user.service';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ShowDocumentModalComponent } from '../../Client/client-documents/show-document-modal/show-document-modal.component';

import { ClientDocumentBllService } from '../../Client/client-documents/service/client-document-bll.service';
import { ShowClientDocument } from '../show-document-modal/show-document-modal.component';
import { LegaldocsComponent } from '../legaldocs/legaldocs.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legalstatus',
  templateUrl: './legalstatus.component.html',
  styleUrls: ['./legalstatus.component.scss']
})
export class LegalstatusComponent implements OnInit {

  constructor(private _ClientDocumentBllService: ClientDocumentBllService, private _route : Router,
    private UserService : UserService, private http: HttpClient , private modal : NgbModal) { }
  //showContent = true;


  private httpClient: HttpClient;
  isStatus = false;
  isStatus1 = false;
  isPackage = false;
  isSend = true;
  isCode = false;
  isClientStatus = false;
  isLegalStatus = false;
  legalStat;

  disableCBSV = false;
  disableSAT = false;
  disableMSA = false;




  public documents = [
    {
      name : "CBSV"
    },
    {
      name : "MSA"
    },
    {
      name : "SAT"
    }
  ]

  name;
  email ;
  companyname;
  website ;
  address ;
  place ;
  city ;
  state;
  zip ;
  userEmail;
  userCode;

  stateName;
  cityName;
  userDoc =''

  public displayServices = []
  public dis = [];
  showContent = false;


  signedDoc()
  {
    this.isStatus = true;
    this.isStatus1 = false;
    this.legalStat = true;

  }

  //  getDocuments():Observable<any>{
  //    let params = new HttpParams().set("userId",  this.userId);
  //    return this.http.get(`http://localhost:8080/document/getDocumentUserRelList`, {params});
  //  }
/*
   getDocuments():Observable<any>{
    //let params = new HttpParams().set("userId",  this.userId);
    return this.http.get(`http://localhost:8080/document/getDocumentUserRelList`, {params});
  }
  */


   userId;
   signature;
  ngOnInit(): void {
    console.log(this.UserService.clientData["userid"])

    this.UserService.getdocumentUser(this.UserService.clientData["userid"]).subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];

      console.log(getCountArray)

      for (let x of getCountArray) {
        if (x["documentName"] == "CBSV.pdf") {
          console.log("cbsv found")
          if(x["status"] == '2') {
            console.log("status is 2")
            this.disableCBSV = true;
          }
        }
        else if (x["documentName"] == "SAT.pdf") {
          console.log("sat found")
          if(x["status"] == '2') {
            console.log("status is 2")
            this.disableSAT = true;
          }
        }
        else if (x["documentName"] == "MSA.pdf") {
          console.log("msa found")
          if(x["status"] == '2') {
            console.log("status is 2")
            this.disableMSA = true;
          }
        }
      }

      for(var d of getCountArray)
      {
        if(d["userId"] == this.UserService.clientData["userid"])
        {
          if(d["documentString"] == null)
          {

          }
          else
          {
            this.signature = d["documentString"];
            this.UserService.clientSignature = d["documentString"];
          }
        }
      }

      console.log(this.signature)

      //this.signature  = decodeURIComponent(escape(atob(this.signature)))
      console.log(this.signature)
      })

    setTimeout(() => this.showContent = true, 250);

    console.log(this.UserService.clientData["name"]);

    console.log(this.UserService.clientData["userid"])

   // console.log(this.getDocuments());

    this.userId = this.UserService.clientData["userid"];
    this.userEmail = this.UserService.clientData["userEmail"];
    this.userCode = this.UserService.clientData["code"];

    this.name = this.UserService.clientData["name"];
    this.email = this.UserService.clientData["email"]
    this.companyname = this.UserService.clientData["companyname"]
   // this.website = this.UserService.clientData["companyname"]

    this.place = this.UserService.clientData["address"];
    this.city = this.UserService.clientData["city"];
    this.state = this.UserService.clientData["state"]
    this.zip = this.UserService.clientData["zipcode"]
    console.log(this.city);
/*
    this.UserService.getStates().subscribe(data => {

      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];

      for(var d of getCountArray)
      {
        if(d["id"] == this.state)
        {
          this.stateName = d["name"];
          break;
        }
      }
      console.log(this.stateName);

      this.UserService.getCity().subscribe(data => {

        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray1 = parseCount["responseObject"];
        //console.log(getCountArray)

        for(var d of getCountArray1)
        {
          if(d["id"] == this.city)
          {
            this.cityName = d["name"];
            break;
          }
        }

        console.log(this.cityName);
        this.address = this.place + ", " + this.cityName + ", " + this.stateName + ", " + this.zip;


      // this.address = 'hello'
        console.log(this.address);

      })
    })
    */
/*
      this.UserService.getAllPackage(this.UserService.userDetailId).subscribe(data => {
        var counter = 0;
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];


        for(var d of getCountArray)
        {
          //console.log(d["packageServiceRelData"][counter]["serviceAlias"]);
          for(var d1 of  d["packageServiceRelData"])
          {
            //console.log(d1)
            this.displayServices.push({"serviceAlias" : d1["serviceAlias"], "servicePrice" : d1["servicePrice"], "comments" : d["comments"]})
          }
          //console.log(counter)


        }


        console.log(counter)
        this.dis = this.displayServices



      //console.log(this.dis)


    })
    */

    if(this.userCode == 7)
    {

      this.isStatus1 = true;
      this.isClientStatus = true;
      this.isLegalStatus = false;

    }

    console.log(this.userCode)
    if(this.userCode == 6)
    {

      this.isStatus1 = true;
      this.isClientStatus = false;
      this.isLegalStatus = false;

    }

    //console.log(this.UserService.userDetailId)

  //  this.getDocuments()

  this.getSignedDocs();



  }

  openDocument(documentNo,name,status){

    this._ClientDocumentBllService.selectedDocument=this._ClientDocumentBllService.documents[documentNo];
    const modalRef = this.modal.open(LegaldocsComponent, {
     size: 'xl',
   });
    modalRef.componentInstance.type = documentNo;
    modalRef.componentInstance.fileName = name;
    this.UserService.documentStatus = status;


 }

 getSignedDocs() {
    this.UserService.getdocumentUser(this.UserService.clientData["userid"]).subscribe(data =>
    {
      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];

      console.log(getCountArray)

    })
  }

  viewDocs(){
    this.UserService.adminsideAgreeCheck = 1;
    this.UserService.getuserIdFromAdmin = this.UserService.clientData["userid"]
    this._route.navigate(['/MY_DOCUMENT'])


  }
}

