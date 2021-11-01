import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpBackend,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/APIs/user/authentication.service";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "src/app/APIs/user/user.service";
import { environment } from "src/environments/environment";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private backendClient: HttpClient;
  constructor(private authenticationService: AuthenticationService, private router: Router, private cookies : CookieService, private UserService : UserService,
    private httpBackend : HttpBackend) {
      this.backendClient = new HttpClient(httpBackend);
     }
  
  apiAuthenticate = environment.api_url + "/authenticate"

  refreshToken(form) {
    return new Promise((resolve, reject) => {
      this.backendClient
        .post(this.apiAuthenticate, form)
        .subscribe(
          (response) => {
            resolve(response);

            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
           // console.log(obj);
            var x = obj["responseCode"];

          },
          (error) => {
            reject(error);

          }
        );
    });
  }

user : any = {
  email : null,
  password : null
}

private tokenExpired(token: string) {
  const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  console.log(expiry)

  //console.log(expiry-200)
 
  console.log( (Math.floor((new Date).getTime() / 1000)))
  console.log( (Math.floor((new Date).getTime() / 1000)) + 15)
  return (Math.floor((new Date).getTime() / 1000)) >= (expiry-300);
}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      
      catchError((err) => {
        if (err.status === 401) {
          this.authenticationService.logout();
          window.location.reload();
        }
        /*
        if(err.status === 403)
        {
          this.authenticationService.logout();
          window.location.reload();
        }
        */

        
       
        const error = err?.error?.Message;
        
        return throwError(error);
      })
      
    );
  }
}
