import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-bulkorders',
  templateUrl: './bulkorders.component.html',
  styleUrls: ['./bulkorders.component.scss']
})
export class BulkordersComponent implements OnInit {

  constructor(private fb : FormBuilder, private UserService : UserService, private _route : Router) {
    this.ordersData = this.fb.group({
      orders : this.fb.array([])

    })
    this.orders().push(this.newOrder());
   }


  ordersData : FormGroup;


  orders(): FormArray {
    return this.ordersData.get("orders") as FormArray
  }

/*
  [
    {
        "lastName": "testuser",
        "firstName": "test",
        "middleName": "user",
        "email": "vk@mail.com",
        "dateOfBirth": "10-10-1990",
        "state": 3920,
        "city": 42671,
        "zipcode": "123456",
        "packageIds": [
            47
        ]
    },
    {
        "lastName": "testuser",
        "firstName": "test",
        "middleName": "user",
        "email": "vk@mail.com",
        "dateOfBirth": "10-10-1990",
        "state": 3920,
        "city": 42671,
        "zipcode": "123456",
        "packageIds": [
            47
        ]
    }
]
*/

arr = []
submitted = false;

  newOrder(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: '',
      email : ['', Validators.required],
      dateOfBirth : ['', Validators.required],
      state : ['', Validators.required],
      city : ['', Validators.required],
      country : ['', Validators.required],
      houseApt : ['', Validators.required],
      streetAddress : ['', Validators.required],
      phoneNumber : '',
      zipcode : ['', Validators.required],
      socialSecurityNumber : ['', Validators.required],
      pid : ['', Validators.required],




    })
  }


  addOrder() {
    this.orders().push(this.newOrder());
  }

  removeOrder(empIndex:number) {
    this.orders().removeAt(empIndex);
  }
/*
  packages(empIndex:number) : FormArray {
    return this.orders().at(empIndex).get("packageIds") as FormArray
  }
  */
/*
  addids(empIndex:number) {

    var ids = this.ordersData.value["orders"][empIndex]["pid"]


    this.packages(empIndex).push(ids);
  }
  */

  pkgid;
  packageIdss = []
/*
  onChangedPackage(i){
   // var stat = (<HTMLInputElement>document.getElementById('pkg'+ i)).value;
   // this.packageIdss[i] = stat
   this.packageIdss = []
    console.log(this.ordersData.value["orders"][i]["pid"])
    this.packageIdss.push(this.ordersData.value["orders"][i]["pid"])

    this.ordersData.value["orders"][i]["packageIds"] = this.packageIdss

  }
  */

  onChangedCountry(i)
  {

    console.log(i)



    this.id = this.ordersData.value["orders"][i]["country"]

    if(this.id == undefined)
    {
      this.id = '231'
    }


    this.UserService.getStateByCountryId1(this.id).subscribe(data =>
      {
        let toStringStat = JSON.stringify(data);
        const parseCount = JSON.parse(toStringStat);
        var getStatArray = parseCount["responseObject"];
        //console.log(getStatArray)

        this.byid[i] = [];

        this.byid[i] = data["responseObject"];

        //console.log(this.byid)
  /*
        for (var d of getStatArray)
        {

          this.byid.push({"id" : d["id"], "name" : d["name"]});
          //console.log(d["id"]);


        }
        */

      //  console.log(this.byid)



        //console.log(this.byid);

      })

  }

  onChangedState(i)
  {

    this.UserService.getCitybyStateId(this.ordersData.value["orders"][i]["state"]).subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
      //  console.log(getCountArray);
      this.Cities[i] = [];

      this.Cities[i] = getCountArray
  /*
        for(var addCiti of getCountArray)
        {

          this.Cities.push({"id" : addCiti["id"], "name" : addCiti["name"]})
        }
        */
      })
  }
  onChangedCity(e)
  {

  }


  getState(selectedCountry : any)
  {

  }
ordersArray = []
msg;
showStatusMsg = false;


/*

   firstName: '',
      lastName: '',
      middleName: '',
      email : '',
      dateOfBirth : '',
      state : '',
      city : '',
      country : '',
      houseApt : '',
      streetAddress : '',
      phoneNumber : '',
      zipcode : '',
      socialSecurityNumber : '',
      pid : '1',
      packageIds : []

*/



onSearchChange(event : any)
{
 // const input = event.target as HTMLInputElement;

  let trimmed = event.target.value.replace(/\s+/g, '');

  if (trimmed.length > 9) {
    trimmed = trimmed.substr(0, 9);
  }


  trimmed = trimmed.replace(/-/g,'');

  let numbers = [];

  numbers.push(trimmed.substr(0,2));
  if(trimmed.substr(2,2)!=="")
  numbers.push(trimmed.substr(2,2));
  if(trimmed.substr(4,4)!="")
  numbers.push(trimmed.substr(4,4));


  event.target.value = numbers.join('-');
  console.log(event.target.value)
}

onRestrictZero(event : any)
{

    let trimmed = event.target.value.replace(/\s+/g, '');

    if (trimmed.length > 10) {
      trimmed = trimmed.substr(0, 10);
    }


    trimmed = trimmed.replace(/-/g,'');

    let numbers = [];

    numbers.push(trimmed.substr(0,3));
    if(trimmed.substr(3,2)!=="")
    numbers.push(trimmed.substr(3,2));
    if(trimmed.substr(5,4)!="")
    numbers.push(trimmed.substr(5,4));


    event.target.value = numbers.join('-');




 // console.log(event.target.value)
}


/*
getSSn;
onSsn(searchValue : string, i)
  {

    if(searchValue.length > 3)
    {
      const input = event.target as HTMLInputElement;

      let trimmed = searchValue.replace(/\s+/g, '');

      if (trimmed.length > 11) {
        trimmed = trimmed.substr(0, 11);
      }


      trimmed = trimmed.replace(/-/g,'');

      let numbers = [];

      numbers.push(trimmed.substr(0,3));
      if(trimmed.substr(3,2)!=="")
      numbers.push(trimmed.substr(3,2));
      if(trimmed.substr(5,4)!="")
      numbers.push(trimmed.substr(5,4));


      input.value = numbers.join('-');
      console.log(input.value)

      this.ordersData.value["orders"][i]["socialSecurityNumber"] = input.value;


   //   this.getSSn = numbers.join('-');


    }
  }
  */

orderReports = []
showSsnMsg = false;
ssnMsg = "Please Enter a Valid SSN"


  submit()
  {
    this.showSsnMsg = false;
    //console.log(this.ordersData.value)
    this.submitted = true
    this.orderReports = []
    var ssn;
    for(var d of this.ordersData.value["orders"])
    {
      this.packageIdss = []
      this.packageIdss.push(d["pid"])
      ssn = d["socialSecurityNumber"].replace(/-/g, "");

      var ssnNum: any = +ssn;
      console.log(ssnNum)

      var regEx = /^\d{3}-?\d{2}-?\d{4}$/;

      var validssn = regEx.test(ssnNum);
      console.log(validssn)
      if (validssn == false){

        this.showSsnMsg = true
        break;

      }

     // console.log(ssn)
      this.orderReports.push({"firstName" : d["firstName"], "lastName" : d["lastName"], "middleName" : d["middleName"], "email" : d["email"],
        "dateOfBirth" : d["dateOfBirth"], "state" : d["state"], "city" : d["city"], "country" : d["country"], "houseApt" : d["houseApt"],
        "streetAddress" : d["streetAddress"], "phoneNumber" : d["phoneNumber"], "zipcode" : d["zipcode"], "socialSecurityNumber" : ssn,
        "packageIds" : this.packageIdss})

    }


    console.log(this.orderReports)


    if(this.ordersData.value["orders"].length > 0)
    {

      this.showStatusMsg = false
      if(this.ordersData.valid)
      {
        this.showStatusMsg = false

        this.UserService
        .createBulkOrders(this.orderReports)
        .then((res: any) => {
          console.log(res)

          if(res.responseCode == 131)
          {
              this.showStatusMsg = false

            localStorage.setItem("orderSuccess", "yes")

            this._route.navigate(['/REPORT_MANAGEMENT']);

          }
          else
          {
            // console.log("Error")
            this.msg = "Failed to create order. Response Message: " + res.responseMessage
            this.showStatusMsg = true
          }

        })
        .catch((err) => {
        // this.loading = false
          this.msg = "Failed to create order."
          this.showStatusMsg = true

          });




        }
        else if(this.ordersData.invalid)
        {
          console.log("invalid form")
        }
    }
    else
    {
      this.msg = "At least 1 order is required"
      this.showStatusMsg = true
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
    // let contObj = JSON.stringify(this.Countries);
     // const parseCont = JSON.parse(contObj);
     // this.countryObject = parseCont;

      //console.log(this.countryObject);
    });
  }


  getAllPackages = []
  Countries = <any>[];
  byid = <any[]>[]
  Cities = <any[]>[]
  id;


  errorshow = false;
  error2show = false;
  OnInput(event: any) {
    if ((event.target.value).toString().slice(0, 3) === '000') {
      this.errorshow = true;
    }
    else {
      this.errorshow = false;
    }
  }
  OnInput2(event: any) {
    if ((event.target.value).toString().slice(0, 3) === '000') {
      this.error2show = true;
    }
    else {
      this.error2show = false;
    }
  }

  ngOnInit(): void {

    this.get_country();


/*
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
        for (var d of getStatArray)
        {

          this.byid.push({"id" : d["id"], "name" : d["name"]});
          //console.log(d["id"]);
        }
        //console.log(this.byid);

      })
      */

    this.UserService.getAllPackages().subscribe(data => {
        let toStringStat = JSON.stringify(data);
        const parseCount = JSON.parse(toStringStat);
        var getPackArray = parseCount["responseObject"];
        console.log(this.getAllPackages)

        for(var d of getPackArray)
        {
          this.getAllPackages.push({"name":d['packageName'],"price":d['packagePrice'], "id":d['packageId']})
        }
    })



  }

}
