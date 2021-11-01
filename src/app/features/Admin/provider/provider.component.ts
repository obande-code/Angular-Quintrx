import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';
import { ProviderlistComponent } from '../providerlist/providerlist.component';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  constructor(private _route : Router,private UserService : UserService) { }
  isButtonVisible = true;
  showMaster = false;
  getProviderEmail;
  getProviderPhone;
  getProviderStatus

  apihit = false;
  

  newProvider : any = {
    name : null,
    pocEmailAddress : null,
    pocPhone : null,
    status : 1,

    serviceData : []
  }

  public services: any = [{
    
    apiId: '',
    apiName: '',
    apiCost: '',
    apiPrice: '',
    serviceMasterId : '',
    status: '1'
  
  }
  ];


  

  provider : any = {
    providerId : null,
    name : null,
    pocEmailAddress : null,
    pocPhone : null,
    status : null,
    serviceData : []
  };


  errorMessage : string = null;
  addService()
  {
    this.pkgMsgs = false;
    this.services.push({
      id: this.services.length + 1,
      
      apiName: '',
      apiCost: '',
      apiPrice: '',
      serviceMasterId : '',
      status: '1'
      
    });
  }

  servMsgs = false;

  removeAddress(i: number, e : any) {
    this.pkgMsgs = false;
    this.servMsgs = false;

    if(this.UserService.check == 1)
    {
      
      
      var id = e["apiId"];
      console.log(id);
    
      this.UserService.delService(id)

      .then((result) => {
     // console.log("success")
      if(result["responseCode"] == 324)
      {
        this.services.splice(i, 1);
        this.msg = "Api deleted successfully."
        this.servMsgs = true;
      }
      else
      {
        // setTimeout(() => 2500000000);
        //window.location.reload();
        console.log("Error ");
        this.servMsgs = false;
        this.msg = "Unable to delete Api. Response Message: " + result["responseMessage"]
        this.pkgMsgs = true;
      }

      
      
      })
      .catch((err) => {
      console.log(err);

     
    });
    
    }
    else if(this.UserService.check == 2)
    {
     
      
      var id = e["apiId"];
      console.log(id);
    
      this.UserService.delService(id)

      .then((result) => {

        if(result["responseCode"] == 324)
        {
          this.services.splice(i, 1);
          console.log(result)
        }
        else
        {
         // setTimeout(() => 2500000000);
          //window.location.reload();
          console.log("Error ");
        }

     // console.log("success")
      
      
      })
      .catch((err) => {
      console.log(err);
      });
    }
    else
    {
      this.services.splice(i, 1);
    }

    
    console.log(e)
  }
  getId : number;
  s = {}
  
  newServie = [];
  getPId;
  showContent;
  getNewProviderName : string;
  getProviderName : string;
  msg;
  pkgMsgs = false;
  code ; 


  validate(e, i)
  {
    if(!e)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  submit()
  {


    
    
   // console.log(this.provider)
   // console.log(this.services)
  // this.services.splice(0, "providerId", 123);
   //console.log(this.services)

   console.log(this.UserService.prolist)


    if(this.UserService.check==1)
    {

      this.pkgMsgs = false;
      this.servMsgs = false;
      console.log(this.UserService.check)
     // var checcked;
      this.getNewProviderName = (<HTMLInputElement>document.getElementById("user-Fname")).value;
     // this.provider.name = this.getNewProviderName;
    
      this.provider.name = this.newProvider.name;
      this.provider.pocEmailAddress = this.newProvider.pocEmailAddress;
      this.provider.pocPhone = this.newProvider.pocPhone;
      if(this.newProvider.status == 1)
      {
        this.provider.status = 1;
      }
      else if(this.newProvider.status == 0)
      {
        this.provider.status = 0;
      }
    //  this.provider.status = this.newProvider.status;
      this.provider.providerId = this.providerId;
      //console.log(this.provider)
      
    //  var checknewStatus;
      this.newServie = []

      for(var d of this.services)
        {
            
            if(d["status"] == 1)
            {
             
              this.newServie.push({"apiId" : d["apiId"] , "apiName" : d["apiName"], "apiCost" : d["apiCost"], "apiPrice" : d["apiPrice"],"serviceMasterId" : d["serviceMasterId"], "status" : true});

            }
            else if(d["status"] == 0)
            {
              this.newServie.push({"apiId" : d["apiId"] ,"apiName" : d["apiName"], "apiCost" : d["apiCost"], "apiPrice" : d["apiPrice"], "serviceMasterId" : d["serviceMasterId"], "status" : false});
            }
          //  console.log(this.code)
            
        }
        console.log(this.newServie)
        this.provider.serviceData = this.newServie;

        console.log(this.provider)


        this.apihit = true;

      console.log(this.newProvider)
     

        if(!this.newProvider.name)
        {
          this.msg = "Please enter the provider name"
          this.pkgMsgs = true;
          this.apihit = false
        }
        else if(!this.newProvider.pocEmailAddress)
        {
          this.msg = "Please enter the provider email"
          this.pkgMsgs = true;
          this.apihit = false
        }
        else if(!this.newProvider.status)
        {
          this.msg = "Please select the provider status"
          this.pkgMsgs = true;
          this.apihit = false
        }
        else
        {
          var check = false;
          for(var d of this.provider.serviceData)
          {
            if(!d["apiCost"] || !d["apiName"] || !d["apiPrice"] || !d["status"] || d["serviceMasterId"] == "")
            {
              check = true;
              break
            }
          }

          if(check == true)
          {
            this.msg = "One or more fields are empty. Please enter all the data."
            this.pkgMsgs = true;
            this.apihit = false
          }
          else
          {
            
            this.pkgMsgs = false;
                
            this.UserService.updateProvider(this.provider)
            .then((result) => {
            // this.getPId = this.UserService.provId;
            if(result["responseCode"] == 313)
            {
              this.apihit = false;
              localStorage.setItem("providerUp", "update")
              this._route.navigate(['/providerlist'])
            }
            else
            {
              this.apihit = false;
            }
            

              

              
            })
            .catch((err) => {
            // this.errorMessage = err.message;
            });
            
          }
        }


      















    
      

      
      
    }
    else if(this.UserService.check == 2)
    {
      var checkkedd;
      this.servMsgs = false;
      for(var d of this.services)
      {


        if(d["status"] == 1)
        {
          checkkedd = true;


        }
        else if(d["status"] == 0)
        {
          checkkedd == false;
        }

        this.newServie.push({"providerId" : d["providerId"], "apiId" : d["apiId"], "apiName" : d["apiName"],
         "apiCost" : d["apiCost"], "apiPrice" : d["apiPrice"], "status" : checkkedd});
      }

      for(var d of this.newServie)
      {
        this.UserService.updateService(d)
          .then((result) => {
            
            
            //console.log(this.UserService.getcode)
        
        
          })
          .catch((err) => {
            this.errorMessage = err.message;
          });
      }
      this._route.navigate(['/servicelist'])
      
    }
    else
    {
      this.servMsgs = false;
      this.getProviderName = (<HTMLInputElement>document.getElementById("user-Fname")).value;
      this.provider.name = this.getProviderName;
      var checkStatus;
      this.newServie = []

      for(var d of this.services)
        {
            
            if(d["status"] == 1)
            {
              checkStatus = true;

            }
            else if(d["status"] == 0)
            {
              checkStatus == false;
            }
            this.newServie.push({"apiName" : d["apiName"], "apiCost" : d["apiCost"], "apiPrice" : d["apiPrice"], "serviceMasterId" : d["serviceMasterId"] ,"status" : checkStatus});
        }

    
       

        if(this.newProvider.status == 1)
        {
          this.newProvider.status = 1;
        }
        
        if(this.newProvider.status == 0)
        { 
          this.newProvider.status = 0;
        }
        

       // this.newProvider.name = this.getProviderName;
        this.newProvider.serviceData = this.newServie;
        console.log( this.newProvider.status)

       // this.newProvider.pocEmailAddress = "hami@mail.com"
       // this.newProvider.pocPhone = "7088309829"

      this.apihit = true;

      console.log(this.newProvider)
      if(this.newProvider.serviceData < 1)
      {
        this.msg = "At least 1 API is required to add provider"
        this.pkgMsgs = true;
        this.apihit = false
      }
      else
      {

        if(!this.newProvider.name)
        {
          this.msg = "Please enter the provider name"
          this.pkgMsgs = true;
          this.apihit = false
        }
        else if(!this.newProvider.pocEmailAddress)
        {
          this.msg = "Please enter the provider email"
          this.pkgMsgs = true;
          this.apihit = false
        }
        else if(this.newProvider.status != 1 && this.newProvider.status != 0)
        {
          console.log(this.newProvider.status)
          this.msg = "Please select the provider status"
          this.pkgMsgs = true;
          this.apihit = false
        }
        else
        {
          var check = false;
          for(var d of this.newProvider.serviceData)
          {
            if(!d["apiCost"] || !d["apiName"] || !d["apiPrice"] || !d["status"] || d["serviceMasterId"] == "")
            {
              check = true;
              break
            }
          }

          if(check == true)
          {
            this.msg = "One or more fields are empty. Please enter all the data."
            this.pkgMsgs = true;
            this.apihit = false
          }
          else
          {
            
            this.pkgMsgs = false;
            this.UserService.addProvider(this.newProvider)
            .then((result) => {
              if(result["responseMessage"] == "Provider detail added successfully.")
              {
                localStorage.setItem("providerAdd", "yes")
                this.apihit = false
                this._route.navigate(['/providerlist'])
              }
              else
              {
                this.apihit = false
              }
            
            })
            .catch((err) => {
              this.errorMessage = err.message;
            });
          }
        }


      }
     
        
        
        
      
        
        
    }

      
  
   
   
   //this.check = (<HTMLInputElement>document.getElementById("user-Fname")).value; 
   //console.log(this.check);
   


  }

  getservice()

  {
   
  }

  providerName = ""
  check :string;
  public dummyService = [];
  providerId;

  isDisabled = false;
  displayAllServices = []
  ngOnInit(): void {

   
    
    this.UserService.getAllMasterService().subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        //this.displayProviders = getCountArray;


        for(var d of getCountArray)
        {

          //console.log(d[4]);
          this.displayAllServices.push({"serviceMasterId" : d["serviceMasterId"], "serviceAlias" : d["serviceName"]});

        }

      })


    



      if(this.UserService.check == 1)
      {
       
        console.log(this.UserService.check);
          var id;
    
        console.log(this.UserService.prolist)
        if(this.UserService.prolist.length == 0)
        {
          console.log("empty");
        }
        else
        {
          for(var d of this.UserService.prolist)
          {
            //this.providerName = d["name"];
            this.providerId = d["id"];
            this.newProvider.name = d["name"]
            this.newProvider.pocEmailAddress = d["pocEmailAddress"]
            this.newProvider.pocPhone = d["pocPhone"]

            if(d["status"] == false)
            {
              this.newProvider.status = '0'
            }
            else if(d["status"]  == true)
            {
              this.newProvider.status = '1'
            }
            
            
          }
        }


        this.UserService.getAllServices().subscribe(data => 
          {
            let toStringCount = JSON.stringify(data);
            const parseCount = JSON.parse(toStringCount);
            var getCountArray = parseCount["responseObject"];
            //this.displayProviders = getCountArray;

            var checkStatusCode;
            console.log(this.providerId)
            for(var d of getCountArray)
            {
              

              if(d["providerId"] == this.providerId)
              {
                

                if(d["status"] == true)
                {
                  checkStatusCode = 1;
                }
                else if(d["status"] == false)
                {
                  checkStatusCode = 0
                }

                this.dummyService.push({"apiId" : d["apiId"] ,"apiName" : d["apiName"], "apiCost" : d["apiCost"], "apiPrice" : d["apiPrice"], "status" : checkStatusCode, "serviceMasterId": d["serviceMasterId"]})
              }
            
            
            }
            
          // console.log(getCountArray)

        
          })
          
          this.services = this.dummyService;
          console.log(this.services)
  
      }
      else if(this.UserService.check == 2)
      {
        var proId;
        this.isDisabled = true;
       this.isButtonVisible = false;
     

       // console.log(this.UserService.servlist);
        for(var d of this.UserService.servlist)
        {
          proId = d["providerId"];
        }
        var checkStatusCode;
        
        this.UserService.getProviderById(proId).subscribe(data => 
          {
            let toStringCount = JSON.stringify(data);
            const parseCount = JSON.parse(toStringCount);
            var getCountArray = parseCount["responseObject"];
            console.log(getCountArray)
            //this.displayProviders = getCountArray;
            
            var id = getCountArray["providerId"]
            this.providerName = getCountArray["name"]

            for (var d of this.UserService.servlist)
            {
              
              
                console.log(d)

                if(d["status"] == true)
                {
                  checkStatusCode = 1;
                }
                else if(d["status"] == false)
                {
                  checkStatusCode = 0
                }

                this.dummyService.push({"serviceId" : d["serviceId"] ,"serviceName" : d["serviceName"], "serviceCost" : d["serviceCost"],
                 "servicePrice" : d["servicePrice"], "providerId" : d["providerId"]  ,"status" : checkStatusCode})
              
            }
            console.log(this.dummyService)


            
    
          })
          this.services = this.dummyService;
          
          
       
       
      }



        //console.log(this.UserService.check);
      
   
   
  }
 

}
