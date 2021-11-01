import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of,
  Subscription,
  throwError,
} from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenData } from 'src/app/modals/token-data.model';
import { UserService } from './user.service';
import * as _ from 'lodash';
import { isBreakOrContinueStatement } from 'typescript';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private message;
  pType;
  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = `${environment.appVersion}-${environment.USER_DATA_KEY}`;
  public userEmailKey: string = 'USER_EMAIL';

  displayHeader;

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  currentUser$: Observable<TokenData>;
  currentUserSubject: BehaviorSubject<TokenData>;

  menus$: Observable<any>;
  menusSubject: BehaviorSubject<any>;

  get currentUserValue(): TokenData {
    return this.currentUserSubject.value;
  }

  set currentUserValue(TokenData: TokenData) {
    this.currentUserSubject.next(TokenData);
  }

  get menusValue(): any {
    return this.menusSubject.value;
  }

  set menusValue(menus: any) {
    this.menusSubject.next(menus);
  }

  constructor(private http: HttpClient, private router: Router, private UserService : UserService, private cookies : CookieService ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<TokenData>(this.getAuthFromLocalStorage());
    this.menusSubject = new BehaviorSubject<any>(of(undefined));

    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.menus$ = this.menusSubject.asObservable();
  }

  login(loginRequest: any, userServiced: UserService): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http
      .post<any>(`${environment.api_url}/authenticate`, loginRequest)
      .pipe(
        map((res: any) => {
          const result = this.setAuthFromLocalStorage(res, userServiced, loginRequest);
          if (result) {
            console.log(result)
          }
          return { result, message: this.message };
        }),
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  logout() {
    localStorage.clear();
    this.cookies.delete("userEmail")
    this.cookies.delete("userPassword")
    //localStorage.removeItem(this.authLocalStorageToken);
    this.currentUserSubject.next(null);
    //localStorage.removeItem(this.userEmailKey);
    this.router.navigate(['login']);
  }

  userIdd;

  public getUserGroupRelationDetailByEmail(email) {
    return this.http
      .get<any>(`${environment.api_url}/getUserGroupRelationDetailByEmail/${email}`)
      .pipe(
        map((res: any) => {

          return res;
        }),
        catchError((err) => {
          //console.log("403")
          return of(err);
        }),
      );
  }

  authNumber;



  getUserMenuFromJson(userMenuJson) {
    let menuList = [];
    if (userMenuJson.responseCode == 0) {

      let userGroupRelData = userMenuJson.responseObject.userGroupRelData;
      let finalArray = userGroupRelData[0].groupDataProfile.menuActionGroupRel;
      let userId = userMenuJson.responseObject.userId;
      let tempArray = [];
      this.authNumber = userGroupRelData;
      this.userIdd = userId
     // console.log(this.authNumber)
     // console.log(this.authLocalStorageToken)

      for(let i=0; i<finalArray.length;i++) {


         if(finalArray[i].menuData.parentMenuId === 0 || finalArray[i].menuData.parentMenuId === 1 || finalArray[i].menuData.parentMenuId === undefined) {
            menuList.push({
              groupId:finalArray[i].groupId,
              menuId : finalArray[i].menuId,
              permission: finalArray[i].permission,
              alias:  finalArray[i].menuData.alias,
              name: finalArray[i].menuData.name,
              parentMenuId: finalArray[i].menuData.parentMenuId,
              orderNumber: finalArray[i].menuData.orderNumber,
              subMenuList: [],
              dropDownTarget: '',
              isSubmenu: false
            })
         } else {
           tempArray.push(finalArray[i].menuData);
         }
      }


      for(let n =0; n<menuList.length; n++) {
        for(let m=0;m<tempArray.length;m++){
          if(tempArray[m].parentMenuId === menuList[n].menuId) {
             menuList[n].subMenuList.push(tempArray[m]);
             menuList[n].dropDownTarget = 'description3Target'+m
             menuList[n].isSubmenu = true
          }
        }
      }


       for(let j =0; j<menuList.length; j++) {
         menuList[j].subMenuList = _.orderBy(menuList[j].subMenuList, 'orderNumber', 'asc');
      }



       let list = _.orderBy(menuList, 'orderNumber', 'asc');

      // console.log(list);
    return list;
    }

  }

  // getRouteWRTOmenu(menuName) {

  //   //console.log(menuName)
  //   switch (menuName) {
  //     case "HOME":
  //       return "dashboard";
  //     case "ORDER_REPORT":
  //       return "orderReports";
  //     case "REPORT_MANAGEMENT":
  //       return "report-management";
  //     case "SALES_DASHBOARD":
  //       return "sales-dashboard";
  //     case "ADMIN_DASHBOARD":
  //       return "admin-dashboard";
  //     case "REPORT":
  //       return 'order-list'
  //     case "MY_DOCUMENT":
  //       return 'mydocuments'
  //   }
  // }



  apiAuthenticate = environment.api_url + "/authenticate"
  refreshToken(data : any)
  {
    this.isLoadingSubject.next(true);
    return this.http
      .post<any>(`${environment.api_url}/authenticate`, data)
      .pipe(
        map((res: any) => {

          const result = this.setAuthFromLocalStorage(res, this.UserService, data);
          if (result) {
            console.log(result)
          }
          return { result, message: this.message };
        }),
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

 getAuthFromLocalStorage(): TokenData {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );

      return authData;
    } catch (error) {
      return undefined;
    }
  }



  setRefreshedauth(tokenData : TokenData, user : any)
  {
    if (
      tokenData &&
      // replace 0 with 1 when backend is fixed.
      tokenData.responseCode == 0 &&
      tokenData.responseObject.access_token

    ) {

      localStorage.setItem(
        this.authLocalStorageToken,
        JSON.stringify(tokenData)
      );

      this.displayHeader = true;
      this.currentUserSubject.next(tokenData);


      this.getUserGroupRelationDetailByEmail(user.email).subscribe(x => {
        // let menus = x.responseObject.userGroupRelData.;
        // console.log(x)
        // menus = _.orderBy(menus, ['name']);
       // console.log(x);
        this.menusSubject.next(this.getUserMenuFromJson(x));
      });

      return true;
    }
    if (!this.message) {
      this.message = tokenData.responseMessage;
    // } else {
    //   this.message = 'Something is wrong!!!';
    // }
    return false;
    }

  }


 statusCode;
   setAuthFromLocalStorage(tokenData: TokenData, userServiced: UserService, userLog: any): boolean {

    var profileType;
    var statusCode1 = 1 // redirct to home
    var statusCode2 = 2 // redirect to confirmation
    var statusCode3 = 3 // redirect to signup user details
    var statusCode4 = 4 // redirect to services page
    var statusCode5 = 5 // redirect to thankyou page
    var statusCode6 = 6 // redirect to home
    var statusCode7 = 7 // redirect to acceptance message


    if (
      tokenData &&
      // replace 0 with 1 when backend is fixed.
      tokenData.responseCode == 0 &&
      tokenData.responseObject.access_token

    ) {

      localStorage.setItem(
        this.authLocalStorageToken,
        JSON.stringify(tokenData)
      );



      this.displayHeader = true;
      var x;
      // you get the access to every api
      this.currentUserSubject.next(tokenData);
     // console.log(userLog.email);
     // console.log(tokenData)

      this.getUserGroupRelationDetailByEmail(userLog.email).subscribe(x => {
        // let menus = x.responseObject.userGroupRelData.;
      
        // menus = _.orderBy(menus, ['name']);
        
        localStorage.setItem("userGroupId", x["responseObject"]["groupId"])

        //console.log(x);
       this.statusCode = x["responseObject"]["userStatusCode"]
      // console.log(this.statusCode)
      // console.log(x["responseObject"]["userId"])

       //this.UserService.userId = x["responseObject"]["userId"]
        for(var d of x["responseObject"]["userGroupRelData"])
        {
          //console.log(d)
          //console.log(d["groupDataProfile"]["profileType"])
         // console.log(d)
          //this.statusCode = d["userStatusCode"]
          profileType = d["groupDataProfile"]["name"]
          this.pType = d["groupDataProfile"]["name"]
          localStorage.setItem('profileType', profileType)

        }

      //  console.log(profileType)

        if(profileType == "Client")
        {


          if (this.statusCode == statusCode1) {
            this.router.navigate(['/HOME']);
          }
          else if (this.statusCode == statusCode2) {
            this.router.navigate(['/confirmation']);
          }
          else if (this.statusCode == statusCode3) {
            this.router.navigate(['/user-details']);
          }
          else if (this.statusCode == statusCode4) {
            this.router.navigate(['/client-document']);
          }
           else if (this.statusCode == statusCode6) {
             this.router.navigate(['/HOME']);
           }
          else if (this.statusCode == statusCode5) {
            this.router.navigate(['/HOME']);
          }
          // else if (x == statusCode6) {
          //   this.router.navigate(['/agreement']);
          // }
          else if (this.statusCode == statusCode7) {
            this.router.navigate(['/acceptancemsg']);
          }
      }else if(profileType == "Admin")
      {
        this.router.navigate(['/ADMIN_DASHBOARD']);
      }
      else if(profileType == "Sales")
      {
        this.router.navigate(['/sales-dashboard']);
      }
      else if(profileType == "Legal")
      {
        this.router.navigate(['/NEW_CLIENTS']);
      }
      else if(profileType == "Account")
      {
        this.router.navigate(['/NEW_CLIENTS']);
      }

        else {


          if (this.statusCode == statusCode1) {
            this.router.navigate(['/HOME']);
          }
          else if (this.statusCode == statusCode2) {
            this.router.navigate(['/confirmation']);
          }
          else if (this.statusCode == statusCode3) {
            this.router.navigate(['/user-details']);
          }
          else if (this.statusCode == statusCode4) {
            this.router.navigate(['/client-document']);
          }
          // else if (x == statusCode6) {
          //   this.router.navigate(['/agreement']);
          // }
          else if (this.statusCode == statusCode5) {
            this.router.navigate(['/HOME']);
          }
           else if (x == statusCode6) {
             this.router.navigate(['/HOME']);
           }
          else if (this.statusCode == statusCode7) {
            this.router.navigate(['/acceptancemsg']);
          }
        }
/*
        if(profileType == "Client")
         {

          if (this.statusCode == statusCode1) {
            this.router.navigate(['/dashboard']);
          }
          else if (this.statusCode == statusCode2) {
            this.router.navigate(['/confirmation']);
          }
          else if (this.statusCode == statusCode3) {
            this.router.navigate(['/consent']);
          }
          else if (this.statusCode == statusCode4) {
            this.router.navigate(['/services']);
          }

          else if (this.statusCode == statusCode5) {
            this.router.navigate(['/thankyou']);
          }

          else if (this.statusCode == statusCode7) {
            this.router.navigate(['/acceptancemsg']);
          }

         }
         else if(profileType == "Sales")
         {
           this.router.navigate(['/sales-dashboard']);
         }

        else if(profileType == "Admin")
        {
          this.router.navigate(['/admin-dashboard']);
        }
        */

        this.menusSubject.next(this.getUserMenuFromJson(x));
      });



      return true;
    }

    if (!this.message) {
      this.message = tokenData.responseMessage;
    // } else {
    //   this.message = 'Something is wrong!!!';
    // }
    return false;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
