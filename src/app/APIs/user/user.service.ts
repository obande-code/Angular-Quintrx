import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  isLoading$ = false

  constructor(private httpClient: HttpClient, private _route: Router) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);


  }

  isLoadingSubject: BehaviorSubject<boolean>;

  eRR: string;
  userEmail;

  public prolist = [];
  public servlist = [];
  public userList = [];
  public clientData = [];
  public packageServiceData = [];
  public menulist = [];
  public userData = [];
  public reportManageData = [];
  public userGroupActionData = [];

  public consentData ;
  docStatusSummary;
  docStatusApp;
  docStatusServ;

  pagestatus;
  orderDetailId;
  sendOrderDetailId;
  isVerified;
  passwordCheck;
  clientSideCheck;
  clientSideData = []

  displayHeader;
  clientSignature;

  documentStatus;
  documentCheck;

  userId;
  groupId;



  userManagementStatus;
  commentsData;
  check;
  userCheck;
  check_service;
  userDetailId;
  legalStatus;
  groupActionCheck;

  newLeadCheck;
  followUpCheck;
  isSigned = false;
  pkgName : string;

  documentUserRelId;
  tempId;
  consentorderId;

  documentName;
  orderId;
  isDefault;
  adminsideAgreeCheck;
  getuserIdFromAdmin;
  consolodatedORderID;
  neworderDetailId;


  orderStatusCode;

  docType;
  defaultCheck;


  termsOfUseChecked$ = new BehaviorSubject(false);
  privacyPolicyChecked$ = new BehaviorSubject(false);




  // login(data: any) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient
  //       .post(environment.api_url + '/api/authenticate', data)
  //       .subscribe(
  //         (response) => {
  //           resolve(response);

  //           let code = JSON.stringify(response);
  //           const obj = JSON.parse(code);
  //           var x = obj["responseCode"];
  //           var msgg = obj["responseMessage"];
  //           console.log(response);
  //           if (x == 0) {
  //             this._route.navigate(['/consent']);

  //           }
  //           else if (x == 1) {
  //             this.eRR = msgg;

  //             //console.log("Success")
  //           }
  //         },
  //         (error) => {
  //           reject(error);
  //         }
  //       );
  //   });
  // }

  register(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(environment.api_url + '/register', data)
        .subscribe(
          (response) => {
            resolve(response);
            console.log(response)
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
           // console.log(obj);
            var x = obj["responseCode"];
           // var msgg = obj["responseMessage"];

            if(x == 112)
            {
              this._route.navigate(['/confirmation']);
            }
            else
            {
              console.log("error")
            }

          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  addProfileDetails(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(environment.api_url + '/createuserdetails', data)
        .subscribe(
          (response) => {
            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
           // console.log(obj);
            var x = obj["responseCode"];

            if(x == 121)
            {
              this._route.navigate(['/client-document']);

            }


          },
          (error) => {
            reject(error);

          }
        );
    });
  }

  addMainMenu(data: any){
    this.isLoading$ = true
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(environment.api_url + '/acl/createMenu', data)
        .subscribe(
          (response) => {
            resolve(response);
            console.log(response);
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

  apiCountryUrl = environment.api_url +'/cascade/findAllCountry'
  apiCountryById = environment.api_url +'/cascade/findCountryById/'
  apiStateUrl = environment.api_url +'/cascade/findAllState'
  apiStateByCountryId = environment.api_url +'/cascade/findStatesByCountry/'
  apiCityUrl = environment.api_url +'/cascade/findAllCity'
  apiCitybyStateId = environment.api_url +'/cascade/findCitiesByState/'
  //apiFind = 'https://vetzu-java-dev.azurewebsites.net/cascade/findAllCountry'

  getCountry()
  {
    return this.httpClient.get(this.apiCountryUrl);
  }

  getCountrybyId()
  {
    return this.httpClient.get(this.apiCountryById+'231');
  }

  getStates()
  {
    return this.httpClient.get(this.apiStateUrl);
  }
  getStateByCountryId()
  {
    return this.httpClient.get(this.apiStateByCountryId+'231');
  }

  getStateByCountryId1(id: string)
  {
    return this.httpClient.get(this.apiStateByCountryId+id);
  }

  getCity()
  {
    return this.httpClient.get(this.apiCityUrl);
  }
  getCitybyStateId(id : string)
  {
    return this.httpClient.get(this.apiCitybyStateId+ id);
  }


apiAllProviders = environment.api_url +'/serviceprovider/findAllProvider'
getAllProviders()
{
  return this.httpClient.get(this.apiAllProviders);
}



apiAllServices = environment.api_url +'/serviceprovider/findAllService'
getAllServices()
{
  return this.httpClient.get(this.apiAllServices);
}

apiAllUser = environment.api_url +'/findAllUser'

getAllUsers()
{
  return this.httpClient.get(this.apiAllUser);
}


apiDocuSign = environment.api_url +'/docusign/getDocuments/ONBOARDING'

getDocuSign()
{

  this.isSigned = false;
  console.log(this.isSigned)
  return this.httpClient.get(this.apiDocuSign)
}


apiUpdateStatus = environment.api_url +'/docusign/updateDocumentStatus?documentType=ONBOARDING&envelopeId=1234'


updateDocuStatus()
{
  return new Promise((resolve, reject) => {
    this.httpClient
      .post(this.apiUpdateStatus, null)
      .subscribe(
        (response) => {

          resolve(response);

          let code = JSON.stringify(response);
          const obj = JSON.parse(code);
         // console.log(obj);
          var x = obj["responseCode"];

          console.log(response)




        },
        (error) => {
          reject(error);
        }
      );
  });
}


apisendDocu = environment.api_url +'/docusign/sendDocuments?email='
sendDocuments(email: any) {
  return new Promise((resolve, reject) => {
    this.httpClient
      .post(this.apisendDocu+email, null)
      .subscribe(
        (response) => {

          resolve(response);

          let code = JSON.stringify(response);
          const obj = JSON.parse(code);
         // console.log(obj);
          var x = obj["responseCode"];

          console.log(email)
          console.log(response)




        },
        (error) => {
          reject(error);
        }
      );
  });
}

apiDelProvider = environment.api_url +'/serviceprovider/deleteprovider/'

delProvider(id: any) {
  return new Promise((resolve, reject) => {
    this.httpClient
      .delete(this.apiDelProvider+id)
      .subscribe(
        (response) => {

          resolve(response);
          console.log(response)
          let code = JSON.stringify(response);
          const obj = JSON.parse(code);
         // console.log(obj);
          var x = obj["responseCode"];



         

       //


        },
        (error) => {
          reject(error);
        }
      );
  });
}

apiDelService = environment.api_url +'/serviceprovider/deleteservice/'


delService(id: any) {
  return new Promise((resolve, reject) => {
    this.httpClient
      .delete(this.apiDelService+id)
      .subscribe(
        (response) => {

          resolve(response);

          let code = JSON.stringify(response);
          const obj = JSON.parse(code);
         // console.log(obj);
          var x = obj["responseCode"];

          console.log(response)

         

       //


        },
        (error) => {
          reject(error);
        }
      );
  });
}


delServicelist(id: any) {
  return new Promise((resolve, reject) => {
    this.httpClient
      .delete(this.apiDelService+id)
      .subscribe(
        (response) => {

          resolve(response);
          console.log(response)
         console.log(id)
          let code = JSON.stringify(response);
          const obj = JSON.parse(code);
         // console.log(obj);
          var x = obj["responseCode"];

          //console.log(response);
/*
          if(x == 0)
          {
            console.log(response)
          }
          else
          {
           // setTimeout(() => 2500000000);
            window.location.reload();
            console.log("deleted");
          }
          */

       //


        },
        (error) => {
          reject(error);
        }
      );
  });
}







provId : number;


addProvider(data: any) {
  return new Promise((resolve, reject) => {
    this.httpClient
      .post(environment.api_url + '/serviceprovider/createprovider', data)
      .subscribe(
        (response) => {

          resolve(response);
          console.log(response);

          let code = JSON.stringify(response);
          const obj = JSON.parse(code);
         // console.log(obj);
        
         
          //var getId = id["providerId"]
          //this.provId = getId;
          //console.log(getId)

        },
        (error) => {
          reject(error);
        }
      );
  });
}

getcode = []

addService(data: any) {
  return new Promise((resolve, reject) => {
    this.httpClient
      .post(environment.api_url + '/serviceprovider/createservice', data)
      .subscribe(
        (response) => {

          resolve(response);
          console.log(response);
          let code = JSON.stringify(response);
          const obj = JSON.parse(code);
          this.getcode.push(obj["responseCode"]);


        },
        (error) => {
          reject(error);
        }
      );
  });
}


apiUpdateProvider = environment.api_url +'/serviceprovider/updateprovider/'

updateProvider(data: any) {
  return new Promise((resolve, reject) => {
    this.httpClient
      .post(this.apiUpdateProvider, data)
      .subscribe(
        (response) => {

          resolve(response);
          console.log(response);
          let code = JSON.stringify(response);
          const obj = JSON.parse(code);
         // console.log(obj);
         
         
          //var getId = id["providerId"]
          //this.provId = getId;

        },
        (error) => {
          reject(error);
        }
      );
  });
}




apiUpdateService = environment.api_url +'/serviceprovider/updateservice/'

updateService(data: any) {
  return new Promise((resolve, reject) => {
    this.httpClient
      .post(this.apiUpdateService, data)
      .subscribe(
        (response) => {

          resolve(response);
          console.log(response);
          let code = JSON.stringify(response);
          const obj = JSON.parse(code);


        },
        (error) => {
          reject(error);
        }
      );
  });
}




apiFindProviderbyId = environment.api_url +'/serviceprovider/findProviderById/'



getProviderById(id: any)
  {
    return this.httpClient.get(this.apiFindProviderbyId+id);
  }

  apiAddPackage = environment.api_url +'/createpackage'
pkgSuccessMsg;
pkgCode;
  addPackage(data : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiAddPackage, data)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseObject"]["packageName"]
            var x1 =  obj["responseMessage"]
            var x2 = obj["reponseCode"]
           // console.log(x)
            this.pkgSuccessMsg = x1;
            this.pkgCode = x2;
            this.pkgName = x;


          },
          (error) => {
            reject(error);
          }
        );
    });

  }


  apiDeleteUser = environment.api_url +'/deleteuser/'

  delUser(id: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.apiDeleteUser+id)
        .subscribe(
          (response) => {

            resolve(response);

            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseCode"];
      

          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  apiFindUserDetail = environment.api_url +'/findAllUserDetail'



  getUserDetail()
  {
    return this.httpClient.get(this.apiFindUserDetail);
  }


  apiFindPackage = environment.api_url +'/findPackageClientId/'

  getAllPackage(id : any)
  {
    return this.httpClient.get(this.apiFindPackage + id);
  }

  apiFindAllPackages = environment.api_url +'/findAllPackage'
  getAllPackage2()
  {
    return this.httpClient.get(this.apiFindAllPackages);
  }



  apiFindAllMasterService = environment.api_url +'/findAllMasterServices'

  getAllMasterService()
  {
    return this.httpClient.get(this.apiFindAllMasterService)
  }

  apiCreateUserGroup = environment.api_url +'/acl/createGroup'

  createUserGroup(data : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiCreateUserGroup, data)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            //let code = JSON.stringify(response);
            //const obj = JSON.parse(code);
            //var x = obj["responseObject"]
           // console.log(x)



          },
          (error) => {
            reject(error);
          }
        );
    });

  }



  apiFindallUserGroup = environment.api_url +'/acl/findAllGroup'
  getAllUserGroup()
  {
    return this.httpClient.get(this.apiFindallUserGroup)
  }




  apiDelUserGroup = environment.api_url +'/acl/deleteGroup/'

  delUserGroup(id: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.apiDelUserGroup+id)
        .subscribe(
          (response) => {

            resolve(response);

            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
           
         
            console.log(response)

         


          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  apiUpdateUserGroup = environment.api_url +'/acl/updateGroup'

  updateUserGroup(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiUpdateUserGroup, data)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);


          },
          (error) => {
            reject(error);
          }
        );
    });
  }



  apiFindAllReport = environment.api_url +'/order/findAllOrderReport'
  getAllOrderReport()
  {
    return this.httpClient.get(this.apiFindAllReport)
  }

  apiFindReportById = environment.api_url +'/order/findOrderById?orderId='
  getReportById(id : any)
  {
    return this.httpClient.get(this.apiFindReportById+id)
  }


  apiReportById = environment.api_url +'/order/findMyOrder?orderId='
  getfindReportById(id : any)
  {
    return this.httpClient.get(this.apiReportById+id)
  }



checkStat;
  apiCheckCriminal = environment.api_url +'/order/runOrderReport?'
  checkCriminal(orderId: any, pkgservicemasterid : any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiCheckCriminal+"orderId="+orderId+"&pkgSerMasterRelId="+pkgservicemasterid, null)
        .subscribe(
          (response) => {

            resolve(response);

            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            console.log(response);
            var x = obj["responseMessage"];
           // var x2 = obj["responseObject"]["orderDetailId"]
          //  var x3 = obj["responseObject"]["status"]

           // this.orderDetailId = x2;

           // console.log(x2)
           // console.log(x3)
            this.checkStat = x;

          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  apiFindUser = environment.api_url + '/findUserById/'

  findUser(id: any)
  {
    return this.httpClient.get(this.apiFindUser+id)
  }



  apiUpdateUser = environment.api_url +'/updateuser'

  updateUser(data : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiUpdateUser, data)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);




          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  apiDownloadOrderDocu = environment.api_url +'/document/downloadOrderReportDocument?orderDetailId='

  public getPDF(id : any): Observable<Blob> {
    //const options = { responseType: 'blob' }; there is no use of this
        let uri = '/my/uri';
        // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
        return this.httpClient.get(this.apiDownloadOrderDocu+id, { responseType: 'blob' });
    }


  apiUpdateOrder = environment.api_url +'/order/updateOrderReport?'

  updateOrderReport(id : any, ssn : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiUpdateOrder+"orderId="+id+"&ssn="+ssn, null)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);

           // console.log(this.apiUpdateOrder+ "?orderId="+id+"&"+"ssn="+ssn)
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseMessage"];

            if(x == "Order marked completed.")
            {

              if((this.consentData["fcraDocumentStatus"] == true) && (this.consentData["appDisclosureDocumentStatus"] == true) &&(this.consentData["serviceMasterData"][0]["consentDocumentStatus"] == true))
              {
                          this._route.navigate(['/thank-submission'])
              }
              else
              {
                this._route.navigate(['/application-disclosure'])
              }


            }

          },
          (error) => {
            reject(error);
          }
        );
    });
  }



  apiUpdateOrderstatus = environment.api_url +'/order/updateOrderReport?'

  updateOrderReportStatus(id : any, status : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiUpdateOrderstatus+"orderId="+ id+"&status="+status, null)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseCode"];



          },
          (error) => {
            reject(error);
          }
        );
    });
  }



  apiUpdtaeUserDetial = environment.api_url +'/updateuserdetails'

  updateUserDetails(data : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiUpdtaeUserDetial, data)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  apiCreateUser = environment.api_url +'/createuser'

  createUser(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(environment.api_url + '/createuser', data)
        .subscribe(
          (response) => {
            resolve(response);
            console.log(response);
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



  apiFindAllMenus = environment.api_url + '/acl/findAllMenu'

  getAllMenu()
  {
    return this.httpClient.get(this.apiFindAllMenus)
  }

  apiGetUserDetails = environment.api_url + '/findUserDetailByUserId/'

  getUserDetails(id: any)
  {
    return this.httpClient.get(this.apiGetUserDetails+id)
  }


  apiDeleteUseretail = environment.api_url + '/deleteuserdetail/'


  delUserDetials(id: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.apiDeleteUseretail+id)
        .subscribe(
          (response) => {

            resolve(response);

            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
           // console.log(obj);
            var x = obj["responseCode"];
            console.log(response)

         //


          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  apiCreateGroupAction = environment.api_url + '/acl';

  createcreateMenuActionGroupRelationteUser(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiCreateGroupAction + '/createMenuActionGroupRelation', data)
        .subscribe(
          (response) => {
            resolve(response);
          //  console.log(response);
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

  apiCreateServiceMaster = environment.api_url + '/createMasterService';

  createMasterService(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiCreateServiceMaster, data)
        .subscribe(
          (response) => {
            resolve(response);
            console.log(response);
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


  apiDeleteServiceMaster = environment.api_url + '/deleteMasterService/'

  delServiceMaster(id: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.apiDeleteServiceMaster+id)
        .subscribe(
          (response) => {

            resolve(response);

            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
           // console.log(obj);
           
         //


          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  apiUpdateServiceMaster = environment.api_url + '/updateMasterService'

  updateServiceMaster(data : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiUpdateServiceMaster, data)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseCode"];
/*
            if(x == 0)
            {
              window.location.reload();
            }
            */
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  apiFindMenuActionRelation = environment.api_url + '/acl/findAllMenuActionGroupRelation'

  getMenuActionRelation()
  {
    return this.httpClient.get(this.apiFindMenuActionRelation)
  }

  apiGetDocuUSer = environment.api_url + '/document/getDocumentUserRelList?userId='
  getdocumentUser(id : string)
  {
    return this.httpClient.get(this.apiGetDocuUSer+ id);
  }


  apiupdatereport = environment.api_url + '/order/updateOrderReport'

  updateReport(data : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiupdatereport, data)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseCode"];
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

/*
  apiUploadDocu = 'http://vetzu-java-dev.azurewebsites.net/document/uploadDocument'

  updateReport(data : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiupdatereport, data)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseCode"];
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  */





apiUploadConsent = environment.api_url + '/document/uploadConsentDocument'


uploadConsent(data : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiUploadConsent, data)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseCode"];
          },
          (error) => {
            reject(error);
          }
        );
    });
  }



apiverify = environment.api_url+'/verify?code='

/*
verifiedEmail(code : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiverify+code, null)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseCode"];
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  */


getVerified(code : any)
{
  return this.httpClient.get(this.apiverify+ code);
}



apiForgotPassword = environment.api_url+'/forgotPassword/'


getPasswordLink(email : any)
{
  return this.httpClient.get(this.apiForgotPassword+ email);
}


apiResetLink = environment.api_url+'/verifyCodeAndUpdatePassword?'


getResetPassword(code : any, newpassword : any)
{
  return this.httpClient.get(this.apiResetLink+ "code=" + code + "&newpassword=" + newpassword);
}




apiGetUserDocument = environment.api_url + "/document/getDocumentUserRelList?userId="

getGetDocumentInofrmation(id : any)
{
  return this.httpClient.get(this.apiGetUserDocument+id);
}

apiGetAgreementPdf = environment.api_url + "/document/downloadUserDocument?documentUserRelId="
public getAgreeMentPdf(id : any): Observable<Blob> {
  //const options = { responseType: 'blob' }; there is no use of this
      let uri = '/my/uri';
      // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
      return this.httpClient.get(this.apiGetAgreementPdf+id, { responseType: 'blob' });
  }




  apiGetTemplate = environment.api_url + "/document/getDocumentByTemplateId?templateId="
public getDocTemplate(id : any): Observable<string> {
  //const options = { responseType: 'blob' }; there is no use of this
      let uri = '/my/uri';
      // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
      return this.httpClient.get(this.apiGetTemplate+id, { responseType: 'text'});
  }


  apiGetConsentPDf = environment.api_url + "/document/downloadConsentDocument?orderDetailId="
public getConsentPDf(id : any): Observable<Blob> {
  //const options = { responseType: 'blob' }; there is no use of this
      let uri = '/my/uri';
      // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
      return this.httpClient.get(this.apiGetConsentPDf+id, { responseType: 'blob' });
  }


  apidefaultConsent = environment.api_url + "/document/downloadConsentDocument?orderId="
public getdefault(id : any, name : any): Observable<Blob> {
  //const options = { responseType: 'blob' }; there is no use of this
      let uri = '/my/uri';
      // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
      return this.httpClient.get(this.apidefaultConsent+id+"&documentName="+name, { responseType: 'blob' });
  }



  apiGetDocumentDetails = environment.api_url + "/document/findAllDocumetDetail"

  getMasterDocDetails()
  {
    return this.httpClient.get(this.apiGetDocumentDetails);
  }



  apiCreateDocumentDetail = environment.api_url + "/document/createDocumentDetail"

  createMasterdocument(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiCreateDocumentDetail, data)
        .subscribe(
          (response) => {
            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
           // console.log(obj);
            var x = obj["responseCode"];


            if(x == 0)
            {
              window.location.reload();
            }


          },
          (error) => {
            reject(error);

          }
        );
    });
  }


  apiDelDocDetails = environment.api_url + "/document/deleteDocumentDetail/"
  delDocDetails(id: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.apiDelDocDetails+id)
        .subscribe(
          (response) => {

            resolve(response);

            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
           // console.log(obj);
            var x = obj["responseCode"];
            console.log(response)



            if(x == 0)
            {
              window.location.reload();
            }

         //


          },
          (error) => {
            reject(error);
          }
        );
    });
  }



  apiUpdateDocDetails = environment.api_url + '/document/updateDocumentDetail'

  updateDocDetails(data : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiUpdateDocDetails, data)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseCode"];

            if(x == 0)
            {
              window.location.reload();
            }
          },
          (error) => {
            reject(error);
          }
        );
    });
  }



  apiclientDashboard = environment.api_url + '/order/getMyDashboardDetail'

  getMyDashboardDetails()
  {
    return this.httpClient.get(this.apiclientDashboard);
  }



  apiConsolidatedReport = environment.api_url + "/document/downloadConsolidatedReport?orderId="
public getConsolidatedReport(id : any): Observable<Blob> {
  //const options = { responseType: 'blob' }; there is no use of this
      let uri = '/my/uri';
      // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
      return this.httpClient.get(this.apiConsolidatedReport+id, { responseType: 'blob' });
  }

  apiChangePassword = environment.api_url +'/resetPassword?'

  changePassword(oldpassword : any, newpassword : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiChangePassword+"oldpassword="+ oldpassword+"&newpassword="+newpassword, null)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseCode"];



          },
          (error) => {
            reject(error);
          }
        );
    });
  }



  apiGetOrderByStatus = environment.api_url +  "/order/findOrderByOrderStatus?statusId="

  getOrderByStatus(code : any)
  {
    return this.httpClient.get(this.apiGetOrderByStatus + code);
  }

  apiGetUSerDetailById = environment.api_url +  "/findUserDetailByUserId/"

  getUserDetailbyId(id : any)
  {
    return this.httpClient.get(this.apiGetUSerDetailById + id);
  }




  apiCreateOrder = environment.api_url + "/order/createorder"

  createOrderReport(form) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiCreateOrder, form)
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

   apiIdAnalyzer = 'https://api.idanalyzer.com'

   IdAnalyzer(apikey : any, file: any, face: any) {
     return new Promise((resolve, reject) => {
       this.httpClient
         .post(this.apiIdAnalyzer, apikey, file,)
         .subscribe(
           (response) => {

             resolve(response);
             console.log(response);
             let code = JSON.stringify(response);
             const obj = JSON.parse(code);
           // console.log(obj);
             var x = obj["responseCode"];
             var id = obj["responseObject"];
           },
           (error) => {
             reject(error);
           }
         );
   });
 }

 apiGetAllPackages = environment.api_url +  "/findAllPackage"

  getAllPackages()
  {
    return this.httpClient.get(this.apiGetAllPackages);
  }

 apiBulkOrders = environment.api_url + "/order/createorders"

  createBulkOrders(form) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiBulkOrders, form)
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


  apiAuthenticate = environment.api_url + "/authenticate"

  refreshToken(form) {
    return new Promise((resolve, reject) => {
      this.httpClient
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


  apiDelMenuActionRel = environment.api_url + "/acl/deleteMenuActionGroupRelation"

  delMenuActRel(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.apiDelMenuActionRel, data)
        .subscribe(
          (response) => {

            resolve(response);

            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
           // console.log(obj);
            var x = obj["responseCode"];
            console.log(response)

         //


          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  apiUpdateMenuActionGroupRel = environment.api_url + "/acl/updateMenuActionGroupRelation"

  UpdateMenuActionGroupRel(form) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiUpdateMenuActionGroupRel, form)
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

  apiSearchOrder = environment.api_url + "/order/findOrder?startDate="


  searchOrder(url : any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(url, null)
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

  apiUpdateOrderAdmin = environment.api_url +'/order/updateOrderReport?'

  updateOrderReportFromAdmin(id: any, ssn : any)
  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiUpdateOrderAdmin+"orderId="+id+"&ssn="+ssn, null)
        .subscribe(
          (response) => {

            resolve(response);
            console.log(response);

           // console.log(this.apiUpdateOrder+ "?orderId="+id+"&"+"ssn="+ssn)
            let code = JSON.stringify(response);
            const obj = JSON.parse(code);
            var x = obj["responseMessage"];


          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  generateInvoice(url : any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(url, null)
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

}
