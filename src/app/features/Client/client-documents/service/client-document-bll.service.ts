import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientDocumentBllService {
  fileNames = [
    "CBSVSupplementtoMSA.docx",
    "SATSupplimenttoMSA.docx",
    "VetzuMSA.docx"
  ]

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  count:number = 0;
  documentOne: boolean = false;
  documentTwo: boolean = false;
  documentThree: boolean = false;
  documents = [
    "./../../../../assets/clientdocuments/CBSVSupplementtoMSA.docx",
    //"./../../../../app/features/client/client-documents/show-document-modal/show-document-modal.component.html",
    "./../../../../assets/clientdocuments/SATSupplimenttoMSA.docx",
    "./../../../../assets/clientdocuments/VetzuMSA.docx"
  ]
  selectedDocument: string = "";

  constructor(private http: HttpClient, private auth: AuthenticationService) {

  }


  uploadId(file1 : File, file2 : File): Observable<HttpEvent<any>> {


    const formData: FormData = new FormData();

    formData.append('apikey', 'T3dz2QPXmKgOlZQuMYsnv2Vfh4RmwBsc');
    formData.append('file', file1);
    formData.append('face', file2);


    const req = new HttpRequest('POST', `https://api.idanalyzer.com`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    console.log(req)
    return this.http.request(req);


  }



  upload(file: File, sig :any, ipAddress:string, extraDetail): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    var userId = localStorage.getItem("userId")


    formData.append('file', file);
    formData.append('userId', userId);
    console.log(sig+'_'+ipAddress+'_'+extraDetail.join('_'));
    //formData.append('documentId', "1");
    if (extraDetail.length > 0) {
        formData.append('documentString', sig+'_'+ipAddress+'_'+extraDetail.join('_'));
    } else {
        formData.append('documentString', sig+'_'+ipAddress);
    }

    formData.append('status', '1');


    const req = new HttpRequest('POST', `${environment.api_url}/document/uploadDocuments`, formData, {
      reportProgress: true,
      responseType: 'json'
    });


    // for (var x of this.auth.authNumber) {
    //   console.log(x[])
    // }



    return this.http.request(req);


  }


  uploadConsent(file: File, id :any, status : any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('orderDetailId', id);
    formData.append('documentType', status)

    const req = new HttpRequest('POST', `${environment.api_url}/document/uploadConsentDocument`, formData, {
      reportProgress: true,
      responseType: 'json'
    });



    return this.http.request(req);

  }




  uploadReport(file: File, id :any, status : any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('orderDetailId', id);
    formData.append('status', status)

    const req = new HttpRequest('POST', `${environment.api_url}/document/uploadReportDocument`, formData, {
      reportProgress: true,
      responseType: 'json'
    });



    return this.http.request(req);

  }



}
