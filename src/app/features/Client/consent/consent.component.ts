import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/APIs/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {map, startWith} from 'rxjs/operators';
import {ChangeDetectorRef } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { ngfactoryFilePath } from '@angular/compiler/src/aot/util';
import { NgModule } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';




@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})

export class ConsentComponent implements OnInit {
  public loading: boolean;

  constructor(private UserService: UserService, private modal: NgbModal, private cdr: ChangeDetectorRef) {

  }

  public form: FormGroup;



  cityStateCountry : any = {

    cityData : null,
    stateData : null,
    countryData : null
  };



 
  data1 : string;
  msg : string;


  public Countries = [];



  keyword1 = 'name';
  public Cities = [];
  keyword = 'name';
  countryObject;
  statesObject;

  keyword2 = 'name';


  initialVal  = "United States"
  

  id ;

  getCountItem;
  modify;
  selectEvent(item) {
  this.id = item["id"];
  this.byid = [];

  if(this.id == undefined)
  {
    this.id = '231'
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
  this.cdr.detectChanges();


//  console.log(item);





  }

  onChangeSearch(search: string) {

    //search = this.test;
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.


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
    this.companyDetails.city = this.captureCityId;
    this.individualDetails.city = this.captureCityId;

    this.data1 = item


    //this.companyDetails.countryID = cid;
    //this.companyDetails.cityID = getCityCode;
   // this.companyDetails.stateID = jid;


   //this.initialVal = d.name;
   //this.initialVal2 = this.initialVal;
   //console.log(this.initialVal);
   //this.initialVal1 = sname;

  }



  onChangeSearch1(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
   // let code1 = JSON.stringify(this.data1);
   // const obj1 = JSON.parse(code1);
   // var getName = obj
  //  search.replace(search, "chicago");


  }

  onFocused1(e) {
    // do something
  //  this.get_CitybyStateId();
   // this.get_CitybyStateId();
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
    this.companyDetails.state = this.captureStateId;
    this.individualDetails.state = this.captureStateId;
    console.log(this.captureStateId);
    this.Cities = [];
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

    // do something with selected item


  }

  onChangeSearch2(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

  }

  onFocused2(e) {
    // do something
   // this.get_CitybyStateId();
   //this.get_CitybyStateId();


  }
  searchCleared2()
  {
    this.captureStateId = -1
  }


// ------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

  cCode : string = null;
  cityCode : string = null;

  individualDetails: any = {
    clientType : null,
    userid : 331212,
    contactPersonFirstname : null,
    contactPersonLastname : null,
    contactPersonEmail : null,
    contactPersonPhone : null,
    address : null,
    aptSuite: null,
    country: null,
    city: null,
    state: null,
    zipcode: null,
    indErrors : {},
  };

  errorMessage: string = null;
  errorMsg : string = null;


  submitIndi()
  {
    this.loading = true;
    console.log(this.individualDetails);
    this.individualDetails.country = this.id;

    if (this.validateIndForm()) return;

    this.UserService.addProfileDetails(this.individualDetails)


      .then((result) => {
        this.msg = this.UserService.eRR;

        this.companyDetails
        this.loading = false;

      })
      .catch((err) => {
        this.loading = false;
        console.log(err);

        //this.isLoading$ = false;

        this.errorMsg = err.message;
      });

  }



  validateIndForm()
  {


    const {contactPersonFirstname,  contactPersonLastname, contactPersonEmail, contactPersonPhone,  address, aptSuite,
      country, city, state, zipcode} = this.individualDetails;

/*
      if(city == null || state == null || city == "" || city == undefined || state == "" || state == undefined)
      {
        this.individualDetails.city = city;
        this.individualDetails.state = state;
        console.log(this.individualDetails.city)
      }
      else
      {
        this.individualDetails.city = this.captureCityId;
        this.individualDetails.state = this.captureStateId;
      }
      */


      
    this.individualDetails.city = this.captureCityId;
    this.individualDetails.state = this.captureStateId;
    this.individualDetails.country = this.id


      this.errorMsg = null;


    this.individualDetails.indErrors = {};

    var regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validEmail = regEx.test(contactPersonEmail);

    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var re = /[a-z]/;

    var testPhone = /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var checkPhone = testPhone.test(contactPersonPhone);


  

    if(!contactPersonFirstname)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiFname = true;
      this.errorMsg = 'Please provide your first name'
    }
    else if(!contactPersonLastname)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiLname = true;
      this.errorMsg = 'Please provide your last name'
    }
    else if(!contactPersonEmail)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiEmail = true;
      this.errorMsg = 'Please provide your email'
    }
    else if(!validEmail)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiEmail = true;
      this.errorMsg = 'Please enter a valid email'
    }
    else if(!contactPersonPhone)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiPhone = true;
      this.errorMsg = 'Please provide your phone number'
    }
    else if(!checkPhone)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiPhone = true;
      this.errorMsg = 'Please provide a valid phone number'
    }
    else if(!address)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiStreet = true;
      this.errorMsg = 'Please provide your address'

    }
    else if(!aptSuite)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiSuite = true;
      this.errorMsg = 'Please provide suite/appartment#'
    }
    else if(!zipcode)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiZip = true;
      this.errorMsg = 'Please provide your Zip Code'
    }
    else if(!country || this.individualDetails.country == '-1')
    {
      this.loading = false;
      this.individualDetails.indErrors.indiCountry = true;
      this.errorMsg = 'Please select the country';

    }
    else if(!state || this.individualDetails.state == -1)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiState = true;
      this.errorMsg = 'Please select the state';

    }
    else if(!city || this.individualDetails.city == -1)
    {
      this.loading = false;
      this.individualDetails.indErrors.indiCity = true;
      this.errorMsg = 'Please select the city';

    }
    /*
    else if(!country)
    {
      this.individualDetails.indErrors.indiCountry = true;
      this.errorMsg = 'Please provide Country Id';

    }
    */


    return this.errorMsg && this.errorMsg.length;

  }

  //-------------------------- Company Details Section ------------------------------
//  clientType = '1';
  file : null;
  url: any;
  file1 : null;
  url2 : any;

  onFileChanged(e)
  {
    this.file = e.target.files[0];
    var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_event) => {
			this.url = reader.result;
      console.log(this.url);
		}
  }


  onFileChanged1(e)
  {
    this.file1 = e.target.files[0];
    var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_event) => {
			this.url2 = reader.result;
      console.log(this.url2);
		}
  }

  Cstate : string;



  get_country()
  {
    this.UserService.getCountry().subscribe(data =>
      {

        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        //this.countries = getCountArray;
       // console.log(getCountArray)
        for (var d of getCountArray)
        {
          this.Countries.push({"id" : d["id"], "name" : d["name"]});


        }
        let contObj = JSON.stringify(this.Countries);
        const parseCont = JSON.parse(contObj);

        this.countryObject = parseCont;
        //console.log(this.Cou)





        console.log(this.countryObject);
      });
  }

  get_countrybyID()
  {
    this.UserService.getCountrybyId().subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        console.log(getCountArray);
      })
  }

  get_states()
  {
    this.UserService.getStates().subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
      /*
        for (var d of getCountArray)
        {
          this.States.push({"id" : d[0], "name" : d[1]});

        }

        let contObj = JSON.stringify(this.States);
        const parsest = JSON.parse(contObj);
        this.statesObject = parsest;
        */

        //console.log(this.countryObject);
      })
  }

  public byid = [];
  public byid2 = [];
  get_statesbycountryId1()
  {
    if(this.id == undefined)
    {
      this.id = 231;
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

          this.byid2.push({"id" : d["id"], "name" : d["name"]});
          //console.log(d["id"]);


        }

        this.byid = this.byid2;

        //console.log(this.byid);

      })
  }

  get_statesbycountryId()
  {

    this.byid = []
    this.UserService.getStateByCountryId().subscribe(data =>
      {
        let toStringStat = JSON.stringify(data);
        const parseCount = JSON.parse(toStringStat);
        var getStatArray = parseCount["responseObject"];
       // console.log(getStatArray[0])

        for (var d of getStatArray)
        {

          this.byid.push({"id" : d["id"], "name" : d["name"]});

          //console.log(d["id"]);


        }

        console.log(this.byid);

      })

     // this.Cities = [];
   // console.log(this.sid)


  }

  get_city()
  {



    this.UserService.getCity().subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        for (var d of getCountArray)
        {
          this.Cities.push({"id" : d[0], "name" : d[1]});

        }
      })



  }




  get_CitybyStateId()
  {
    this.Cities = [];
   // console.log(this.sid)
   this.UserService.getCitybyStateId("3919").subscribe(data =>
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
    /*
    for(var getciti of this.byid)
    {



    }
    */

  }



  responseCode;
  submitCompany()
  {
    var respCode;
    this.companyDetails.country = 231;



    //this.get_country();

      if (this.validateform()) return;
      this.loading = true;
      this.UserService.addProfileDetails(this.companyDetails)

        .then((result) => {
          this.loading = false;
          this.msg = this.UserService.eRR;

          this.companyDetails})
        .catch((err) => {
          this.loading = false;
          console.log(err);

          //this.isLoading$ = false;

          this.errorMessage = err.message;
        });
        if(this.responseCode == 211)
        {
          this.errorMessage = this.msg
        }




  }


  val : string;
  validateform()
  {

    //this.val = (<HTMLInputElement>document.getElementById("conCity")).value;
   // console.log(this.val);
    // document.getElementById("excl").style.display="none";
    // document.getElementById("excl1").style.display="none";
    // document.getElementById("excl2").style.display="none";
    // document.getElementById("excl3").style.display="none";
    // document.getElementById("excl4").style.display="none";
    // document.getElementById("excl5").style.display="none";
    // document.getElementById("excl6").style.display="none";
   // document.getElementById("excl7").style.display="none";
   // document.getElementById("excl8").style.display="none";
   // document.getElementById("excl9").style.display="none";
   // document.getElementById("excl10").style.display="none";

    const {companyRegisteredName, employerIdentificationNumber, webSite,contactPersonFirstname, contactPersonLastname, contactPersonEmail,
      contactPersonPhone, address, aptSuite, country ,city, state, zipcode} = this.companyDetails;

    const {cityData, stateData} = this.cityStateCountry;

/*
    if(cityData == null || cityData == "" || stateData == null || stateData == "")
    {
      this.companyDetails.city = 0;
      this.companyDetails.state = 0;
    }
    console.log()

    console.log(this.companyDetails.city)
    */
   /*
    if(city == null || state == null || city == "" || city == undefined || state == "" || state == undefined)
    {
      this.companyDetails.city = city;
      this.companyDetails.state = state;
      console.log(this.companyDetails.city)
    }
    else
    {
      this.companyDetails.city = this.captureCityId;
      this.companyDetails.state = this.captureStateId;
    }
    */

    this.companyDetails.city = this.captureCityId;
    this.companyDetails.state = this.captureStateId;
    this.companyDetails.country = this.id
    this.errorMessage = null;


    this.companyDetails.CompErrors = {};

    var regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validEmail = regEx.test(contactPersonEmail);

    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var re = /[a-z]/;

    var testPhone = /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var checkPhone = testPhone.test(contactPersonPhone);




    if(!companyRegisteredName)
    {
      this.companyDetails.CompErrors.CompRegN = true;
      this.errorMessage = 'Please provide your company name'
    }
    else if(!employerIdentificationNumber)
    {
      this.companyDetails.CompErrors.employerID = true;
      this.errorMessage = 'Please provide your employer ID'
     // document.getElementById("excl1").style.display="";
    }
    else if(!webSite)
    {
      this.companyDetails.CompErrors.CompWeb = true;
      this.errorMessage = 'Please provide your website'
     // document.getElementById("excl2").style.display="";
    }
    else if (!contactPersonFirstname)
    {
      this.companyDetails.CompErrors.CompFN = true;
      this.errorMessage = 'Please enter your First Name';
     // document.getElementById("excl3").style.display="";
    } else if (!contactPersonLastname)
    {
      this.companyDetails.CompErrors.CompLN = true;
      this.errorMessage = 'Please enter your Last Name';
     // document.getElementById("excl4").style.display="";
    } else if (!contactPersonEmail)
    {
      this.companyDetails.CompErrors.Compemail = true;
      this.errorMessage = 'Please provide your Email Address';
    //  document.getElementById("excl5").style.display="";
    }
    else if(!validEmail)
    {
      this.companyDetails.CompErrors.Compemail = true;
      this.errorMessage = 'Please provide a valid Email'
     // document.getElementById("excl5").style.display="";
    }
    else if(!contactPersonPhone)
    {
      this.companyDetails.CompErrors.CompPhone = true;
      this.errorMessage = 'Please provide a valid Phone Number';
     // document.getElementById("excl6").style.display="";
    }
    else if(!checkPhone)
    {
      this.companyDetails.CompErrors.CompPhone = true;
      this.errorMessage = 'Please provide Phone Number';
     // document.getElementById("excl6").style.display="";
    }
    else if(!address)
    {
      this.companyDetails.CompErrors.CompStreet = true;
      this.errorMessage = 'Please provide valid Address';
     // document.getElementById("excl7").style.display="";
    }
    else if(!aptSuite)
    {
      this.companyDetails.CompErrors.CompSuite = true;
      this.errorMessage = 'Please provide Suite#';
     // document.getElementById("excl8").style.display="";
    }
    else if(!zipcode)
    {
      this.companyDetails.CompErrors.CompZip = true;
      this.errorMessage = 'Please provide zip code';
    //  document.getElementById("excl10").style.display="";
    }
    else if(!country || this.companyDetails.country == '-1')
    {
      this.companyDetails.CompErrors.CompCountry = true;
      this.errorMessage = 'Please select the country';

    }
    else if(!state || this.companyDetails.state == -1)
    {
      this.companyDetails.CompErrors.CompState = true;
      this.errorMessage = 'Please select the state';

    }
   
    else if(!city || this.companyDetails.city == -1)
    {
      console.log(this.companyDetails.city)

      this.companyDetails.CompErrors.CompCity = true;
      this.errorMessage = 'Please select the city';
     // document.getElementById("excl9").style.display="";
    }
    /*

    else if(!country)
    {
      this.companyDetails.CompErrors.CompCountry = true;
      this.errorMessage = 'Please provide country Id';

    }
    */

   

    return this.errorMessage && this.errorMessage.length;

  }


  companyDetails: any = {
    clientType : '1',
    companyRegisteredName: null,
    employerIdentificationNumber: null,
    webSite: null,
    contactPersonFirstname: null,
    contactPersonLastname: null,
    contactPersonEmail: null,
    contactPersonPhone: null,
    address: null,
    aptSuite: null,
    country: null,
    city: null,
    state: null,
    zipcode: null,
    CompErrors: {},



  };
/*
  keyDownFunction(event : any)
  {

    if(event.keyCode == 13)
    {
      alert("enter has been pressed");
    }


  }
  */


  // ------------------------------- Navigate different forms --------------------------------
   showIndi()
   {

     document.getElementById("consent-individualForm").style.display="";
     document.getElementById("consent-companyForm").style.display="none";


   }
   showComp()
   {

    document.getElementById("consent-individualForm").style.display="none";
    document.getElementById("consent-companyForm").style.display="";

   }


  ngOnInit(): void {

    this.get_country();
   // this.get_statesbycountryId1();


    if(this.id == undefined)
    {
      this.id = 231;
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



    //this.get_CitybyStateId();


  }





}
