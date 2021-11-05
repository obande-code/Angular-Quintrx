import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

import { FormBuilder, Validators } from '@angular/forms';

import { OrderReportService } from 'src/app/APIs/order-report.service';

import { UserService } from 'src/app/APIs/user/user.service';

import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-packagelist',
  templateUrl: './packagelist.component.html',
  styleUrls: ['./packagelist.component.scss']
})
export class PackagelistComponent implements OnInit {
  public loading: boolean;

  savedValues = null;
  captureCityId;
  showStatusMsg = false;
  msg;

  public packageID;
  public message;

  isChecked = true;

  master_checked: boolean = false;
  master_indeterminate: boolean = false;




  public form: FormGroup;
  constructor(
    private _route: Router,
    private httpClient: HttpClient,
    private UserService: UserService,
    private cdr: ChangeDetectorRef,

    private builder: FormBuilder,
    private _orderReportService: OrderReportService,
    private activeRoute: ActivatedRoute
  )
   {
    // this.form = this.builder.group({
    //   orderId: ['', Validators.required],
    //   firstName: ['', Validators.required],
    //   middleName: [''],
    //   lastName: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   // phoneNumber: ['', Validators.required],
    //   houseApt: ['', Validators.required],
    //   streetAddress: [''],
    //   date: ['', Validators.required],
    //   city: ['', Validators.required],
    //   state: [''],
    //   zipcode: [''],
    //   packageId: ['', Validators.required],
    // });
   }


  packages = [];
  names = [];
  packageId = '';
  searchedPackageName = '';
  getPackages(): Observable<any>{
    return this.httpClient.get<any>(environment.api_url+'/findAllPackage')
  }



  services = [];
  serviceName = [];
  serviceId = [];

  getServices(): Observable<any> {
    return this.httpClient.get<any>(environment.api_url  + '/serviceprovider/findAllService')

  }

  createOrderReport(form) {
    return this.httpClient.post(environment.api_url + '/createorderreport', form)
  }



  fetchSelectedItems() {
    this.packageArray = this.names.filter((value, index) => {
      return value.checked
    });


    //console.log(this.isDisabled);
    //console.log(this.selectedServices);
  }



  list_change(){
    let checked_count = 0;
    this.fetchSelectedItems()

    //Get total checked items
    for (let value of Object.values(this.names)) {
      if(value.checked)
      checked_count++;

    }

    if(this.packageArray.length == 0)
    {
      this.isChecked = true;
    }
    else
    {
      this.isChecked = false;
    }


    //this.packageArray.push(e.id)
  
    if(checked_count>0 && checked_count<this.names.length){
      // If some checkboxes are checked but not all; then set Indeterminate state of the master to true.
      this.master_indeterminate = true;
    }else if(checked_count == this.names.length){
      //If checked count is equal to total items; then check the master checkbox and also set Indeterminate state to false.
      this.master_indeterminate = false;
      this.master_checked = true;
    }else{
      //If none of the checkboxes in the list is checked then uncheck master also set Indeterminate to false.
      this.master_indeterminate = false;
      this.master_checked = false;
    }
  }

  showContent;
  packageArray = []
  showStatusPkg = false;
  ngOnInit(): void {

    if(localStorage.getItem("savedForm"))
    {
      this.savedValues = JSON.parse(localStorage.getItem("savedForm") || '')
      this.showStatusPkg = false

      console.log(this.savedValues)

      this.getPackages().subscribe(
        response => {
          let packagesArray = response.responseObject;
  
          console.log(response)
  
          if(response.responseCode == 321)
          {
            this.showStatusPkg = false;
            if (response.responseObject.length> 0 ){
              this.showStatusPkg = false;
              this.packages = packagesArray;
            
              const names = []
              packagesArray.forEach((p: any) => {
                names.push({"name":p['packageName'],"price":p['packagePrice'], "id":p['packageId'], "checked" : false, "disabled" : false, "labelPosition" : "after"})
                this.packageID = p['packageId']
              })
             // this.packageArray.push(this.packageID)
              this.names = names;
             
            } else {
              this.getServices().subscribe(
                response => {
                  const servicesArray = response.responseObject;
    
                 
                  const serviceName = []
                  servicesArray.forEach((p: any) => {
                    serviceName.push({"serviceName":p['serviceName']})
                  })
                  this.services = serviceName;
                })
            }
    
          }
          else
          {
            this.msg = "Unable to fetch packages. Response Message: " + response.responseMessage
            this.showStatusPkg = true;
          }
         
  
        })
    }
    else
    {
      this.msg = "Order Report Data is missing. Please fill the report form"
      this.showStatusPkg = true
    }
   
   

    //this.checkPackage();
    // this.savedValues = JSON.parse(localStorage.getItem("savedForm") || '')
  }
packageNewIds = []
  placeOrder() {
    this.loading = true
    this.savedValues = JSON.parse(localStorage.getItem("savedForm") || '')
   // console.log(this.savedValues["packageId"])
    //this.savedValues["packageId"] = this.packageID
//this.packageArray.push(19)

    for(var d of this.packageArray)
    {
      this.packageNewIds.push(d["id"])
    }

    
    this.savedValues["packageIds"] = this.packageNewIds
   
     this.UserService
        .createOrderReport(this.savedValues)
        .then((res: any) => {
          
          if(res.responseCode == 131)
          {
            this.showStatusMsg = false
            this.loading = false
            localStorage.setItem("orderSuccess", "yes")
            localStorage.removeItem("savedForm")
            this._route.navigate(['/REPORT_MANAGEMENT']);

          }
          else
          {
            this.msg = "Failed to create order. Response Message: " + res.responseMessage
            this.showStatusMsg = true
          }

        })
        .catch((err) => {
        this.loading = false
         this.msg = "Failed to create order."
         this.showStatusMsg = true
          
         });
        

  }

  someFunction(e) {
   
    this.packageArray.push(e.id);


  }

  orderMessage (res){
    this.message = res.responseMessage;
   
  }



}
