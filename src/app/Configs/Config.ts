import { Injectable } from "@angular/core";
import { UserService } from "../APIs/user/user.service";


@Injectable({
    providedIn: 'root',
  })
export class config {



    constructor(private UserService : UserService)
    {}

  validatePassword(data : any, data2 : any)
  {
    var re = /[a-z]/;
    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;



    if (!data || data.length < 5) {
         return 1
    } else if (data.search(/[A-Z]/) == -1) {

      return 2
    } else if (!re.test(data)) {

      return 3
    } else if (!regularExpression.test(data)) {

      return 4
    } else if (data != data2) {

      return 5
    }
    else
    {
      return 7
    }

  }



    validateEmail(data : string)
    {
      var regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return regEx.test(data)
    }


    validateName(data :any)
    {
        //var testname = /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/
        var testname = /^[A-Za-z]{3,}((\s)?(([A-Za-z])+))*$/


        return testname.test(data)
    }


    validateSSN(data : any)
    {
        var testSSN = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;

        return testSSN.test(data);
    }

    validateDate(data : any)
    {

        // --------- Format mm-dd-yyyy --------------

        var dateformat = /^(0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])[\-]\d{4}$/;
        var check  = true;
        var ss = data.split('-')
        var checkFormat = dateformat.test(data)
        console.log(ss)
        if(checkFormat)
        {
            var month = ss[0];
            var day = ss[1];
            var year = ss[2];
            var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
            if (month==1 || month>2)
            {
                if (day>ListofDays[month-1])
                {
                    //alert('Invalid date format!');
                    check = false;
                }
                console.log(month)
                console.log(check)
            }
            if (month==2)
            {
                var lyear = false;
                if ( (!(year % 4) && year % 100) || !(year % 400))
                {
                    lyear = true;
                }
                if ((lyear==false) && (day>=29))
                {
                    //alert('Invalid date format!');
                    check = false;
                }
                if ((lyear==true) && (day>29))
                {
                    //alert('Invalid date format!');
                    check = false;
                }
                console.log(check)
            }


        }
        else
        {
            //console.log(check)
            check = false;
            alert("Invalid date format!");
        }


        return check;

    }


    validatePhone(data : any)
    {
        var testPhone = /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        return testPhone.test(data);
    }

   Countries = []
   countryObject;


  get_country()
  {

    this.UserService.getCountry().subscribe(data =>
      {
        this.Countries = []
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

      return this.countryObject;
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
  public Cities = []
  get_statesbycountryId1(id : any)
  {
      console.log(id)
    if(id == undefined)
    {
      id = 231;
    }


    this.UserService.getStateByCountryId1(id).subscribe(data =>
      {
        let toStringStat = JSON.stringify(data);
        const parseCount = JSON.parse(toStringStat);
        var getStatArray = parseCount["responseObject"];

        this.byid2 = [];
       // console.log(getStatArray)

        for (var d of getStatArray)
        {

          this.byid2.push({"id" : d["id"], "name" : d["name"]});
          //console.log(d["id"]);


        }



      //  console.log(this.byid2);
       // return this.byid2;

      })

      return this.byid2;

  }

  get_statesbycountryId()
  {

    this.UserService.getStateByCountryId().subscribe(data =>
      {
        this.byid = [];
        let toStringStat = JSON.stringify(data);
        const parseCount = JSON.parse(toStringStat);
        var getStatArray = parseCount["responseObject"];
       // console.log(getStatArray[0])

        for (var d of getStatArray)
        {

          this.byid.push({"id" : d["id"], "name" : d["name"]});

          //console.log(d["id"]);


        }

      //  console.log(this.byid);

      })

     // this.Cities = [];
   // console.log(this.sid)
   return this.byid;


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
          this.Cities.push({"id" : d["id"], "name" : d["name"]});

        }
      })

      return this.Cities;



  }




  get_CitybyStateId()
  {
    this.Cities = [];
   // console.log(this.sid)
    for(var getciti of this.byid)
    {


    this.UserService.getCitybyStateId(getciti["id"]).subscribe(data =>
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

    return this.Cities;

  }



}

