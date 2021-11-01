import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';
import { config } from 'src/app/Configs/Config';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit, AfterContentChecked {

  
  countryData;
  stateData;
  Cities;
  keyword = 'name';
  keyword1 = 'name';
  keyword2 = 'name';



  constructor(private _route : Router, private UserService : UserService, private cdr: ChangeDetectorRef, private conf : config) {
   
   }
  saveData = 'Save'
  doUser = 'Add User'

  userHeading = 'Add User'
  userButton = 'Save'
  showStatusMsg = false;
  msg;

  




  cascadeIds : any = {
    city : null,
    state : null,
    country : null
  }

  createUserDetail : any = {
    clientType : '2',
    contactPersonFirstname : null,
    password : '1234567Aa@',
    groupId : null,
    contactPersonLastname : null,
    contactPersonEmail : null,
    address : null,
    zipcode : null,
    city  : null,
    state : null,
    country: null
  }

  contactPersonFirstname;
  contactPersonLastname;
  contactPersonEmail;
  address;
  zipcode;
  city;
  state;
  country;
  id = '231';

  countryname;
  
 
  
  

  selectEvent(item) {
    this.id = item["id"];
    //this.byid = [];
  
   this.cityName = ''
   this.stateName = ''

   
   if(this.id == undefined)
   {
     this.id = '231';
   }
   
   this.UserService.getStateByCountryId1(this.id).subscribe(data =>
     {
       let toStringStat = JSON.stringify(data);
       const parseCount = JSON.parse(toStringStat);
       var getStatArray = parseCount["responseObject"];
       this.byid = [];
     

       for (var d of getStatArray)
       {

         this.byid.push({"id" : d["id"], "name" : d["name"]});
         //console.log(d["id"]);
       }
       //console.log(this.byid);

     })

   

  
    }
  
    onChangeSearch(search: string) {
  
 
    }
  
    onFocused(e) {
   
    }
    searchCleared()
    {
      this.id = '-1'
    }
  
    stateD : string; 
    getc ;
    getcitiCode;
    captureCityId;
    selectEvent1(item) {
      // do something with selected item
      console.log(item["id"]);
      this.captureCityId = item["id"];
      this.cityName = ''
      this.stateName = ''
  
    }
  
  
  
    onChangeSearch1(search: string) {
    }
  
    onFocused1(e) {
      
    }
    searchCleared1()
    {
      this.captureCityId = -1
    }


    stid;
    //public c =  this.city;
    captureStateId;
    selectEvent2(item) {
  
      this.captureStateId = item["id"];
     // this.Cities = []
      //this.get_CitybyStateId()
      this.cityName = ''
      this.stateName = ''

      this.Cities = [];

      if(this.captureStateId != undefined)
      {
        this.UserService.getCitybyStateId(this.captureStateId).subscribe(data =>
          {
            let toStringCount = JSON.stringify(data);
            const parseCount = JSON.parse(toStringCount);
            var getCountArray = parseCount["responseObject"];
          //  console.log(getCountArray);
    
            for(var addCiti of getCountArray)
            {
    
              this.Cities.push({"id" : addCiti["id"], "name" : addCiti["name"]})
            }
          })
      }
      
     
  
      
  
      // do something with selected item
  
  
    }
  
    onChangeSearch2(search: string) {
     
    }
  
    onFocused2(e) {
    
  
    }
    searchCleared2()
    {
      this.captureStateId = -1
    }




       
  get_country()
  {
    
    this.UserService.getCountry().subscribe(data =>
      {
        this.countryData = [] 
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        //this.countries = getCountArray;
       // console.log(getCountArray)
        for (var d of getCountArray)
        {
          this.countryData.push({"id" : d["id"], "name" : d["name"]});
        }
       
      });

    
  }
  
  public byid = [];
  public byid2 = [];
  
  get_statesbycountryId1(cid : any)
  {
      console.log(this.id)
    if(cid == undefined)
    {
      cid = '231';
    }


    this.UserService.getStateByCountryId1(cid).subscribe(data =>
      {
        let toStringStat = JSON.stringify(data);
        const parseCount = JSON.parse(toStringStat);
        var getStatArray = parseCount["responseObject"];
        this.byid = []
        this.byid2 = [];

        for (var d of getStatArray)
        {

          this.byid2.push({"id" : d["id"], "name" : d["name"]});
          //console.log(d["id"]);


        }

        

      //  console.log(this.byid2);
       this.byid = this.byid2;

      })
    
  }

  
  //----------- checks -----------
  createFname = false;
  createLname = false;
  createGroup = false;
  createEmail = false;
  createAddress = false;
  createZip = false;
  createCountry = false;
  createState = false;
  createCity = false;

  //-----------------------------



  
  userDetails : any = {
    
    groupId : '',
    userId : null,
    firstname : null,
    lastname : null, 
    email : null,
  }

  userDetails1 : any = {
    userDetailId : null,
    clientType : null,
    address : null,
    zipcode : null,
    city : null,
    state : null,
    country : null,
  }


  submit()
  {

   
    console.log(this.userDetails)

    console.log(this.userDetails1)

   if(this.UserService.userManagementStatus == 1)
   {

    
    if(this.id == undefined)
    {
      this.id = '231'
      this.userDetails1.country = this.id;
    }
    else
    {
     this.userDetails1.country = this.id;

    }
    this.userDetails1.city = this.captureCityId;
    this.userDetails1.state = this.captureStateId;
    this.userDetails1.country = this.id;




    if(!this.userDetails.firstname)
    {
     this.msg = 'Please enter the first name'
     this.showStatusMsg = true;
     this.createFname = true;
     this.createLname = false;
     this.createGroup = false;
     this.createEmail = false;
     this.createAddress = false;
     this.createZip = false;
    }
    else if(!this.userDetails.lastname)
    {
     this.msg = 'Please enter the last name'
     this.showStatusMsg = true;
     this.createLname = true;
     this.createFname = false;
     this.createGroup = false;
     this.createEmail = false;
     this.createAddress = false;
     this.createZip = false;
    }
    else if(!this.userDetails.groupId)
    {
     this.msg = 'Please select the group'
     this.showStatusMsg = true;
     this.createGroup = true;
     this.createFname = false;
     this.createLname = false;
     this.createEmail = false;
     this.createAddress = false;
     this.createZip = false;
    }
    else if(!this.userDetails.email || !this.conf.validateEmail(this.userDetails.email))
    {
     this.msg = 'Please enter the valid email address'
     this.showStatusMsg = true;
     this.createEmail = true;
     this.createFname = false;
     this.createLname = false;
     this.createGroup = false;
     this.createAddress = false;
     this.createZip = false;
    }
    else if(!this.userDetails1.address)
    {
     this.msg = 'Please enter the address'
     this.showStatusMsg = true;
     this.createAddress = true;
     this.createFname = false;
     this.createLname = false;
     this.createGroup = false;
     this.createEmail = false;
     this.createZip = false;
    }
    else if(!this.userDetails1.zipcode || this.userDetails1.zipcode.length > 5)
    {
     this.msg = 'Please enter the zipcode'
     this.showStatusMsg = true;
     this.createZip = true;
     this.createFname = false;
     this.createLname = false;
     this.createGroup = false;
     this.createEmail = false;
     this.createAddress = false;
    }
    else if(!this.userDetails1.country || this.userDetails1.country == '-1')
    {
      console.log("in")
     this.msg = 'Please select the country'
     this.showStatusMsg = true;
     this.createCountry = true;
     this.createZip = false;
     this.createFname = false;
     this.createLname = false;
     this.createGroup = false;
     this.createEmail = false;
     this.createAddress = false;
     
    }
    else if(!this.userDetails1.state || this.userDetails1.state == -1)
    {
     this.msg = 'Please select the state'
     this.showStatusMsg = true;
     this.createState = true;
     this.createZip = false;
     this.createFname = false;
     this.createLname = false;
     this.createGroup = false;
     this.createEmail = false;
     this.createAddress = false;
    }
    else if(!this.userDetails1.city || this.userDetails1.city == -1)
    {
     this.msg = 'Please select the city'
     this.showStatusMsg = true;
     this.createCity = true;
     this.createZip = false;
     this.createFname = false;
     this.createLname = false;
     this.createGroup = false;
     this.createEmail = false;
     this.createAddress = false;
    }

    else
    {
      

      this.createZip = false;
      this.createFname = false;
      this.createLname = false;
      this.createGroup = false;
      this.createEmail = false;
      this.createAddress = false;

      this.showStatusMsg = false;


      this.UserService.updateUser(this.userDetails)
      .then((result) => {})
      .catch((err) => {
        console.log(err);
    });
    
    

    console.log(this.userDetails1)


  
    
    this.UserService.updateUserDetails(this.userDetails1)
    .then((result) => {
      if(result["responseCode"] == 121)
      {
        this.showStatusMsg = false;
        localStorage.setItem("userupdated", "yes")
        this._route.navigate(['/usermanagement'])
      }
      else
      {
        this.msg = "Unable to update the user. Response Message: " + result["responseMessage"]
        this.showStatusMsg = true;

      }
    })
    .catch((err) => {
      console.log(err);
      this.msg = "Error while updating the user"
      this.showStatusMsg = true;
      });
      
    }
    
      
        
        
   }
   else
   {
     this.contactPersonFirstname = (<HTMLInputElement>document.getElementById("user-Fname")).value; 
     this.contactPersonLastname = (<HTMLInputElement>document.getElementById("user-Lname")).value;
     this.contactPersonEmail = (<HTMLInputElement>document.getElementById("user-email")).value;
     this.address = (<HTMLInputElement>document.getElementById("user-Address")).value;
     this.zipcode = (<HTMLInputElement>document.getElementById("user-Zip")).value;
     //this.city = (<HTMLInputElement>document.getElementById("user-City")).value;
     //this.state = (<HTMLInputElement>document.getElementById("user-State")).value;
     //this.country = (<HTMLInputElement>document.getElementById("user-Country")).value;

    

     console.log(this.userDetails1)

     this.createUserDetail.contactPersonFirstname = this.contactPersonFirstname
     this.createUserDetail.contactPersonLastname = this.contactPersonLastname
     this.createUserDetail.contactPersonEmail = this.contactPersonEmail
     this.createUserDetail.address = this.address
     this.createUserDetail.zipcode = this.zipcode
     this.createUserDetail.city = this.captureCityId;
     this.createUserDetail.state = this.captureStateId;
     if(this.id == undefined)
     {
       this.id = '231'
       this.createUserDetail.country = this.id;
     }
     else
     {
      this.createUserDetail.country = this.id;

     }
    
     
     this.createUserDetail.groupId = this.userDetails.groupId
    


     
     //this.firstNameInd = this.userDetails.groupId;
     console.log(this.createUserDetail)


/*  
     912 - > input groupId
*/
     if(!this.createUserDetail.contactPersonFirstname)
     {
      this.msg = 'Please enter the first name'
      this.showStatusMsg = true;
      this.createFname = true;
      this.createLname = false;
      this.createGroup = false;
      this.createEmail = false;
      this.createAddress = false;
      this.createZip = false;
     }
     else if(!this.createUserDetail.contactPersonLastname)
     {
      this.msg = 'Please enter the last name'
      this.showStatusMsg = true;
      this.createLname = true;
      this.createFname = false;
      this.createGroup = false;
      this.createEmail = false;
      this.createAddress = false;
      this.createZip = false;
     }
     else if(!this.createUserDetail.groupId)
     {
      this.msg = 'Please select the group'
      this.showStatusMsg = true;
      this.createGroup = true;
      this.createFname = false;
      this.createLname = false;
      this.createEmail = false;
      this.createAddress = false;
      this.createZip = false;
     }
     else if(!this.createUserDetail.contactPersonEmail || !this.conf.validateEmail(this.createUserDetail.contactPersonEmail))
     {
      this.msg = 'Please enter the valid email address'
      this.showStatusMsg = true;
      this.createEmail = true;
      this.createFname = false;
      this.createLname = false;
      this.createGroup = false;
      this.createAddress = false;
      this.createZip = false;
     }
     else if(!this.createUserDetail.address)
     {
      this.msg = 'Please enter the address'
      this.showStatusMsg = true;
      this.createAddress = true;
      this.createFname = false;
      this.createLname = false;
      this.createGroup = false;
      this.createEmail = false;
      this.createZip = false;
     }
     else if(!this.createUserDetail.zipcode || this.createUserDetail.zipcode.length > 5 || this.createUserDetail.zipcode.length < 5)
     {
      this.msg = 'Please enter the 5 digit zipcode'
      this.showStatusMsg = true;
      this.createZip = true;
      this.createFname = false;
      this.createLname = false;
      this.createGroup = false;
      this.createEmail = false;
      this.createAddress = false;
     }
     else if(!this.createUserDetail.country || this.createUserDetail.country == '-1')
     {
      this.msg = 'Please select the Country'
      this.showStatusMsg = true;
      this.createCity = false;
      this.createZip = false;
      this.createFname = false;
      this.createLname = false;
      this.createGroup = false;
      this.createEmail = false;
      this.createAddress = false;
     }
     else if(!this.createUserDetail.state || this.createUserDetail.state == -1)
     {
      this.msg = 'Please select the state'
      this.showStatusMsg = true;
      this.createState = true;
      this.createZip = false;
      this.createFname = false;
      this.createLname = false;
      this.createGroup = false;
      this.createEmail = false;
      this.createAddress = false;
     }
     else if(!this.createUserDetail.city || this.createUserDetail.city == -1)
     {
      this.msg = 'Please select the city'
      this.showStatusMsg = true;
      this.createCity = true;
      this.createZip = false;
      this.createFname = false;
      this.createLname = false;
      this.createGroup = false;
      this.createEmail = false;
      this.createAddress = false;
     }
    
     else
     {
      this.createZip = false;
      this.createFname = false;
      this.createLname = false;
      this.createGroup = false;
      this.createEmail = false;
      this.createAddress = false;

      this.showStatusMsg = false;
      this.UserService.createUser(this.createUserDetail)
      .then((result) => {
 
       if(result["responseCode"] == 0)
       {
         this.showStatusMsg = false;
         localStorage.setItem("useradded", "yes")
         this._route.navigate(['/usermanagement']);
       }
       else
       {
         this.msg = 'Failed to add user. Response Message: ' + result["responseMessage"] 
         this.showStatusMsg = true;
       }
 
      })
 
 
      .catch((err) => {
        console.log(err);
        
       });
     }
    
      
     


     
   
   }

    
  }


  groupSelected(e)
  {
    console.log(e)
  }



  action;
  groups = []

  cityId;
  stateId;
  countryId;
  
  cityName;
  stateName;
  ngOnInit(): void {
    
    this.get_country();

    if(this.id == undefined)
    {
      this.id = '231';
    }
    
    this.UserService.getStateByCountryId1(this.id).subscribe(data =>
      {
        let toStringStat = JSON.stringify(data);
        const parseCount = JSON.parse(toStringStat);
        var getStatArray = parseCount["responseObject"];
        this.byid = [];
        this.byid2 = [];

        for (var d of getStatArray)
        {

          this.byid.push({"id" : d["id"], "name" : d["name"]});
          //console.log(d["id"]);
        }
        //console.log(this.byid);

      })
   
    
     
    this.countryname = 'United States'
    console.log(this.UserService.prolist)
    this.UserService.getAllUserGroup().subscribe(data => {

      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];
      for(var d of getCountArray)
      {
        this.groups.push({"groupId" : d["groupId"], "name" : d["name"], "status" : d["status"]})
      }
     
    })


    if(this.UserService.userManagementStatus == 1)
    {
      this.userHeading = 'Update User';
      this.userButton = 'Update'



      this.userDetails.firstname = this.UserService.prolist["firstname"]
      this.userDetails.lastname = this.UserService.prolist["lastname"]
      this.userDetails.email = this.UserService.prolist["email"]
      this.userDetails.userId = this.UserService.prolist["userId"]
     // this.userDetails1.userId = this.UserService.prolist["userId"]
      this.userDetails.groupId = this.UserService.prolist["groupId"]
      console.log(this.UserService.prolist["userId"])


     


      this.UserService.getUserDetailbyId(this.UserService.prolist["userId"]).subscribe(data => {

        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        console.log(getCountArray)
        this.userDetails1.clientType = getCountArray["clientType"]
        this.userDetails1.userDetailId = getCountArray["userDetailId"]
        this.userDetails1.address = getCountArray["address"]
        this.userDetails1.zipcode = getCountArray["zipcode"]
        this.cityId = getCountArray["city"]
        this.stateId = getCountArray["state"]
        this.countryId = getCountArray["country"]
        /*
        for(var d of getCountArray)
        {
          console.log(d)
         
          if(d["userId"] == this.UserService.prolist["userId"])
          {
            this.userDetails1.clientType = d["clientType"]
            this.userDetails1.userDetailId = d["userDetailId"]
            this.userDetails1.address = d["address"]
            this.userDetails1.zipcode = d["zipcode"]
            this.cityId = d["city"]
            this.stateId = d["state"]
            this.countryId = d["country"]
           break;
          
          
          }
          
        }
        */
        
      
      })

/*
      this.UserService.getCity().subscribe(data => {

        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray1 = parseCount["responseObject"];
        //console.log(getCountArray)
  
        for(var d of getCountArray1)
        {
          if(d["id"] == this.cityId)
          {
          //  this.userDetails1.city = d["id"];
            this.cityName = d["name"]
            this.userDetails1.city = d["id"];
            
            break;
          }
        }
      })


      
      this.UserService.getStates().subscribe(data => {

        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray1 = parseCount["responseObject"];
        //console.log(getCountArray)
  
        for(var d of getCountArray1)
        {
          if(d["id"] == this.stateId)
          {
          //  this.userDetails1.state = d["id"];
            this.stateName = d["name"]
            this.userDetails1.state = d["id"];
           
            break;
          }
        }
      })
      */


      this.UserService.getCountry().subscribe(data => {

        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray1 = parseCount["responseObject"];
        //console.log(getCountArray)
  
        for(var d of getCountArray1)
        {
          if(d["id"] == this.countryId)
          {
            this.id = d["id"];
            this.countryname = d["name"]
            
            break;
          }
        }
      })


      //console.log(this.UserService.userData);
    }

    
  }
  ngAfterContentChecked() : void {
    this.cdr.detectChanges();
}

  

}
