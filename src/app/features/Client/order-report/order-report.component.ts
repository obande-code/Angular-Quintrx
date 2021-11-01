import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderReportService } from '../../../APIs/order-report.service';
import { UserService } from 'src/app/APIs/user/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss'],
})
export class OrderReportComponent implements OnInit {
  myDate = new Date();

  currentDate  = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');

  public Countries = [];


  date : any  = {
    dates : null
  }


  countrystatecity : any = {
    countryId : null,
    stateId : null,
    cityId : null
  }


  onChangedCountry(e)
  {
    //console.log(e.target.value)



    this.byid = [];

    this.id = this.form.value["country"]

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

        for (var d of getStatArray)
        {

          this.byid.push({"id" : d["id"], "name" : d["name"]});
          //console.log(d["id"]);


        }



        //console.log(this.byid);

      })
      this.form.value["state"] = 'x'
      this.Cities=[]

  }

  onChangedState(e)
  {
    this.captureStateId = this.form.value["state"]
    if(this.form.value["state"] == "x" || (this.form.value["state"] == ""))
    {
      this.stateCheck = true
    }
    else
    {
      this.stateCheck = false;
    }
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
  }

  onChangedCity(e)
  {
    if(this.form.value["city"] == "x" || (this.form.value["city"] == ""))
    {
      this.cityCheck = true
    }
    else
    {
      this.cityCheck = false;
    }
  }



  keyword1 = 'name';
  public Cities = [];
  keyword = 'name';
  countryObject;
  statesObject;

  keyword2 = 'name';

  initialVal = 'United States';
  //initialVal2 : string;
  initialVal1: string;
  cCode: string = null;
  cityCode: string = null;


  public submitted = false;
  public form: FormGroup;
  constructor(
    private route: Router,
    private UserService: UserService,
    private cdr: ChangeDetectorRef,

    private builder: FormBuilder,
    private _orderReportService: OrderReportService,
    private activeRoute: ActivatedRoute
  )
   {
    this.form = this.builder.group({


      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // phoneNumber: ['', Validators.required],
      houseApt: ['', Validators.required],
      streetAddress: ['', Validators.required],
      dateOfBirth: [''],
      phoneNumber : ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['231', Validators. required],
      zipcode: ['', Validators.required],
      sendDocumentToEsign : ['true'],
      socialSecurityNumber : ['']

    });
  }

  ngOnInit(): void {
    this.get_country();



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


    this.activeRoute.queryParams.subscribe((params) => {

      //this._orderReportService.showPermissionAlert(params.permissions);
    });
  }


  // capture form data for profile details
  get f() {
    return this.form.controls;

  }


  showSSN = false;
  getStatus()
  {

    var stat = (<HTMLInputElement>document.getElementById("e_sign")).value;


    if(this.form.value["sendDocumentToEsign"] == true)
    {


      this.showSSN = false;
    }
    else if(this.form.value["sendDocumentToEsign"] == false)
    {
      this.showSSN = true
    }



  }
  stateCheck = false;
  cityCheck = false
  ssnCheck = false;
  newstr;
  getSSN;

  onSearchChange(searchValue : string)
  {

    if(searchValue.length > 3)
    {

      let trimmed = searchValue.replace(/\s+/g, '');

      if (trimmed.length > 11) {
        console.log("?")
        trimmed = trimmed.substr(0, 11);
      }


      trimmed = trimmed.replace(/-/g,'');

      let numbers = [];

      numbers.push(trimmed.substr(0,3));
      if(trimmed.substr(3,2)!=="")
      numbers.push(trimmed.substr(3,2));
      if(trimmed.substr(5,4)!="")
      numbers.push(trimmed.substr(5,4));


      this.newstr = numbers.join('-');
      searchValue = numbers.join('-');
     if(searchValue.length == 11)
     {
      var x  = searchValue.replace(searchValue.substr(7, 4), '****')
      this.form.get('socialSecurityNumber').setValue(x);
     this.newstr = x;
     }
     else
     {
      this.form.get('socialSecurityNumber').setValue(this.newstr);

     }
  //var x  = this.form.get('socialSecurityNumber').value.replace(searchValue.substr(7, 4), '****');



     // console.log(searchValue)
     this.getSSN =  searchValue.replace(/-/g, "");




      /*
      this.social = this.form.get('socialSecurityNumber').value;
      var x  = this.form.get('socialSecurityNumber').value.replace(this.social.substr(0, 3), '-****');

      //console.log(searchValue);
      this.social = this.form.get('socialSecurityNumber').value;
      console.log(this.social);
      console.log(this.social.substr(0, 5));
      var x  = this.form.get('socialSecurityNumber').value.replace(this.social.substr(5, 4), '-****');
      var x1 = x.replace(this.social.substr(3, 3), '-')
      this.form.get('socialSecurityNumber').setValue(x1);
      */
    }
  }

  social;
  onBlurSSN() {
    console.log("hi")

    //this.social = this.form.get('socialSecurityNumber').value;
    //this.form.get('socialSecurityNumber').setValue(this.secureSSNFormat(value));

  }
  content: string = "";
  title: string = "";
  changeCount: number = 0;

  secureSSNFormat(inputVal) {
    var retVal = inputVal;
    console.log(inputVal.substr(5, 4))
    if (inputVal == "") return retVal = "";
    // if (topFrame.cnfParam("3413") == "MFF") {
    if (inputVal.length == 9)
      retVal = "****-**-" + inputVal.substr(5, 4);
    else
      alert('enter valid ssn');
    // }
    return retVal;
  }

  isSSN = false;
  msg = "9 digits are required for SSN. Please enter the last 4 digits SSN again"

  onSubmit() {


    var ssN;
    this.submitted = true;
    this.form.value["socialSecurityNumber"] = this.getSSN

   console.log(this.form.value["socialSecurityNumber"])

    if(this.form.value["sendDocumentToEsign"] == true)
    {


      this.form.value["sendDocumentToEsign"] = true

    }
    else if(this.form.value["sendDocumentToEsign"] == false)
    {
      ssN = (<HTMLInputElement>document.getElementById("order-SSn")).value;
      this.form.value["sendDocumentToEsign"] = false

    }

    if(this.form.value["sendDocumentToEsign"] == false && ssN == "")
    {
      this.ssnCheck = true;
    }
    else
    {
      this.ssnCheck = false;
    }


    if(this.form.value["state"] == "x" || (this.form.value["state"] == ""))
    {
      this.stateCheck = true;
    }

      if(this.form.value["city"] == "x" || (this.form.value["city"] == "") || (this.Cities.length  == 0))
      {
        this.cityCheck = true;
      }

   // this.form.value["city"] = this.captureCityId;
    //this.form.value["state"] = this.captureStateId;
    //this.form.value["country"] = this.id;
    var createPerm = (<HTMLInputElement>document.getElementById("datesss")).value;

    //let s  = formatDate(createPerm, 'MM-dd-yyyy', 'en-US')

    //this.form.value["dateOfBirth"] = s;



      if(createPerm != "")
      {
        let s  = formatDate(createPerm, 'MM-dd-yyyy', 'en-US')


        this.form.value["dateOfBirth"] = s;
      }





    localStorage.setItem("savedForm", JSON.stringify(this.form.value));




    var ssnpattern = /^[0-9]*$/
    console.log(ssnpattern.test(this.form.value["socialSecurityNumber"]))

      if(this.form.value["sendDocumentToEsign"] == false)
      {
        var ssnData = (<HTMLInputElement>document.getElementById("order-SSn")).value;
        console.log("is false")
        if(ssnData != "")
        {
          if(ssnpattern.test(this.form.value["socialSecurityNumber"]) && this.form.value["socialSecurityNumber"].length == 9)
          {
            this.isSSN = false
            if (this.form.valid) {

              if(this.stateCheck == false && this.cityCheck == false)
              {
                this.isSSN = false
                this.route.navigate(["/packagelist"])
              }

            }
            // stop here if form is invalid
            else if (this.form.invalid) {
              console.log("Invalid Form")
            }
          }
          else
          {
            this.isSSN = true
          }
        }

      }
      else
      {
        console.log("is true")
        if (this.form.valid) {

          if(this.stateCheck == false && this.cityCheck == false)
          {
            this.isSSN = false
            this.route.navigate(["/packagelist"])
          }

        }
        // stop here if form is invalid
        else if (this.form.invalid) {
          console.log("Invalid Form")
        }
      }







  }

  get_country() {
    this.UserService.getCountry().subscribe((data) => {
      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount['responseObject'];
      //this.countries = getCountArray;
      for (var d of getCountArray) {
        this.Countries.push({ id: d['id'], name: d['name'] });
      }
      let contObj = JSON.stringify(this.Countries);
      const parseCont = JSON.parse(contObj);
      this.countryObject = parseCont;

      //console.log(this.countryObject);
    });
  }

  get_countrybyID() {
    this.UserService.getCountrybyId().subscribe((data) => {
      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount['responseObject'];

    });
  }

  get_states() {
    this.UserService.getStates().subscribe((data) => {
      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount['responseObject'];
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
    });
  }

  public byid = [];
  public byid2 = [];
  get_statesbycountryId1() {
    if (this.id == undefined) {
      this.id = 231;
    }

    this.UserService.getStateByCountryId1(this.id).subscribe((data) => {
      let toStringStat = JSON.stringify(data);
      const parseCount = JSON.parse(toStringStat);
      var getStatArray = parseCount['responseObject'];
      this.byid = [];
      this.byid2 = [];

      for (var d of getStatArray) {
        this.byid2.push({ id: d['id'], name: d['name'] });
        //console.log(d["id"]);
      }

      this.byid = this.byid2;

      //console.log(this.byid);
    });
  }

  get_statesbycountryId() {
    this.UserService.getStateByCountryId().subscribe((data) => {
      let toStringStat = JSON.stringify(data);
      const parseCount = JSON.parse(toStringStat);
      var getStatArray = parseCount['responseObject'];
      // console.log(getStatArray[0])

      for (var d of getStatArray) {
        this.byid.push({ id: d['id'], name: d['name'] });

        //console.log(d["id"]);
      }


    });

    // this.Cities = [];
    // console.log(this.sid)
  }

  get_city() {
    this.UserService.getCity().subscribe((data) => {
      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount['responseObject'];
      for (var d of getCountArray) {
        this.Cities.push({ id: d['id'], name: d['name'] });
      }
    });
  }

  cityStateCountry: any = {
    cityData: null,
    stateData: null,
    countryData: null,
  };

  // public Countries = [];

  // keyword1 = 'name';
  // public Cities = [];
  // keyword = 'name';
  // countryObject;
  // statesObject;

  // keyword2 = 'name';

  // initialVal = 'United States';
  // //initialVal2 : string;
  // initialVal1: string;

  id;

  getCountItem;
  modify;

  get_CitybyStateId() {
    this.Cities = [];
    // console.log(this.sid)
    for (var getciti of this.byid) {
      this.UserService.getCitybyStateId(getciti['id']).subscribe((data) => {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount['responseObject'];
        //  console.log(getCountArray);

        for (var addCiti of getCountArray) {
          this.Cities.push({ id: addCiti['id'], name: addCiti['name'] });
        }
      });
    }
  }

  selectEvent(item) {
    this.id = item['id'];


  //  this.get_statesbycountryId1();
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
  //this.cdr.detectChanges();
    this.cdr.detectChanges();

    //  console.log(item);
  }

  onChangeSearch(search: string) {
    //search = this.test;
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  //   this.get_country();
  //  this.get_countrybyID();
  //  this.get_states();
  //  this.get_statesbycountryId();
  //   this.get_city();
  }

  stateD: string;
  getc;
  getcitiCode;
  captureCityId;
  selectEvent1(item) {
    // do something with selected item

    this.captureCityId = item["id"];
    //this.companyDetails.city = this.captureCityId;
    //this.individualDetails.city = this.captureCityId;

    //this.data1 = item

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
    //this.get_CitybyStateId();
  //  this.get_CitybyStateId();
  }
  stid;
  //public c =  this.city;
  captureStateId;
  selectEvent2(item) {
    this.captureStateId = item['id'];
    //this.companyDetails.state = this.captureStateId;
    // this.individualDetails.state = this.captureStateId;


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
}
