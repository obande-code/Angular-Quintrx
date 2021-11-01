import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { UserService } from 'src/app/APIs/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LegalDocumentBllService {
  fileNames = [
    "CBSVSupplementtoMSA.docx",
    "SATSupplimenttoMSA.docx",
    "VetzuMSA.docx"
  ]

  documents = [
    "./../../../../assets/clientdocuments/CBSVSupplementtoMSA.docx",
    "./../../../../assets/clientdocuments/SATSupplimenttoMSA.docx",
    "./../../../../assets/clientdocuments/VetzuMSA.docx"
  ]
  selectedDocument: string = "";

  constructor(private http: HttpClient, private auth: AuthenticationService, private UserService: UserService) {

  }




  upload(file: File, sig :any): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('userId', this.UserService.clientData["userid"]);
    //formData.append('documentId', "1");
    formData.append('documentString', sig);
    formData.append('status', '2');


    const req = new HttpRequest('POST', `${environment.api_url}/document/uploadDocuments`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    console.log(this.auth.authNumber[0]['userId'])
    // for (var x of this.auth.authNumber) {
    //   console.log(x[])
    // }


    return this.http.request(req);

  }



}
