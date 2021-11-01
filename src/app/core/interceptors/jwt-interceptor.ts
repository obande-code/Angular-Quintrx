import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpBackend } from '@angular/common/http';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { catchError, first, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/APIs/user/user.service';
import { TokenData } from 'src/app/modals/token-data.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private backendClient: HttpClient;

  constructor(private authenticationService: AuthenticationService, private cookies : CookieService, private UserService : UserService,
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

  private fakeTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    var exp = expiry - 500;
   // console.log("fake token time: " + exp)
   // console.log((Math.floor((new Date).getTime() / 1000)))
    return (Math.floor((new Date).getTime() / 1000)) >= exp;
  }


  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    var exp = expiry;
  //  console.log(" Real token Time:  " + exp)
   
    return (Math.floor((new Date).getTime() / 1000)) >= exp;
  }
  

  token : TokenData;
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;

    if (request.url.indexOf('jsonip') === -1){
      if (currentUser && currentUser.responseObject.access_token) {
        
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.responseObject.access_token}`,
          },
        });
        


        if(this.tokenExpired(currentUser.responseObject.access_token) && this.fakeTokenExpired(currentUser.responseObject.access_token))
        {
          this.cookies.set("sessionExp", "Yes")
          this.authenticationService.logout();
          window.location.reload();
        }
        else
        {
          if (this.fakeTokenExpired(currentUser.responseObject.access_token)) {
            console.log("exp")
            this.user.email = this.cookies.get("userEmail")
            this.user.password = this.cookies.get("userPassword")
            console.log(this.user) 
  
  
  
            
            this.refreshToken(this.user)
            .then((result: any) => {
             // console.log(result)
             this.authenticationService.setRefreshedauth(result, this.user);
              request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.responseObject.access_token}`,
              },
  
            });
            })
      
            .catch((err) => {
              console.log(err);
    
            })
            
            
            
          }
          else
          {
            console.log("valid")
           
        
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.responseObject.access_token}`,
              },
            });
            
          }
          
        }

        
        


       
      }
    }
    return next.handle(request)
  //  console.log(currentUser)
   
  }

 
}
