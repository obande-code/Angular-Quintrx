import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private UserService: UserService, private _route : Router) { }

  isDisabled = true;


  public services = []
  public selectedServices = [];


  /*


{

{

    "packageName":"BGVCheckCrimPkg5",
    "clientId":1,
    "packagePrice":800,
    "comments":"hello",
    "serviceMasterData":[{
        "serviceMasterId":59,
        "serviceAlias":"hello",
        "servicePrice":1200
    }]
}

}



  */
  package : any = {

    "packageName" : null,
    "clientId" : null,
    "packagePrice" : null,
    "comments" : "hello",
    "serviceMasterData" : []



  }



/*
  checkServices : any ={
    employeRef : null,
    academicQual : null,
    selfEmploye : null,
    benefits : null,
    selfEmploye2 : null,
    docVerification : null,
    idCheck : null,
    criminalRecord : null,
    electrolRoll : null,
    proQuali : null,
    perRef : null,
    mediaSearch : null,

  };



  checkAllBoxes()
  {
    const {employeRef, academicQual, selfEmploye, benefits, selfEmploye2, docVerification, idCheck
     , criminalRecord , electrolRoll, proQuali, perRef, mediaSearch } = this.checkServices;


     if(employeRef == true || academicQual == true || selfEmploye == true || benefits == true
      || selfEmploye2 == true  || docVerification == true || idCheck == true || criminalRecord == true ||
      electrolRoll == true || proQuali == true || perRef == true || mediaSearch  == true)
      {
        this.isDisabled = false;
      }
      else if(employeRef == false || academicQual == false || selfEmploye == false || benefits == false
        || selfEmploye2 == false || docVerification == false || idCheck == false || criminalRecord == false
        || electrolRoll == false || proQuali == false || perRef == false || mediaSearch == false)
      {
        this.isDisabled = true;
      }

  }
*/


  fetchSelectedItems() {
    this.selectedServices = this.services.filter((value, index) => {
      return value.isChecked
    });


    console.log(this.isDisabled);
    //console.log(this.selectedServices);
  }
  changeSelection() {

    this.fetchSelectedItems()
    if(this.selectedServices.length == 0)
    {
      this.isDisabled = true;
    }
    else
    {
      this.isDisabled = false;
    }


  }

  createPackage()
  {
    var totalserviceCost = 0;
    var newServiceData = [];
    for(var d of this.selectedServices)
    {
      newServiceData.push({"serviceMasterId" : d["serviceMasterId"], "serviceAlias" : d["serviceName"]});
     // totalserviceCost = d["servicePrice"] + totalserviceCost;

    }
    //console.log(totalserviceCost);
    //console.log(newServiceData);



    this.package.packageName = "InterestedIn16";
    this.package.clientId = 1
    this.package.packagePrice = totalserviceCost;
    this.package.serviceMasterData = newServiceData;



    this.UserService.addPackage(this.package)
        .then((result) => {


        })
        .catch((err) => {
          console.log(err);



    });




    console.log(this.package)
    this._route.navigate(['/thankyou']);


    //console.log(this.selectedServices)
    //console.log(this.package)

    //console.log(this.fetchSelectedItems())
    //var x = this.fetchSelectedItems();
    //console.log(x)
  }


  displayServices = []
  ngOnInit(): void {


    this.UserService.getAllMasterService().subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        //this.displayProviders = getCountArray;
        console.log(getCountArray)

        for(var d of getCountArray)
        {

          //console.log(d[4]);
          this.displayServices.push({"serviceMasterId" : d["serviceMasterId"], "serviceName" : d["serviceName"]});

        }

        console.log(this.displayServices)

       // console.log(getCountArray)
        this.services = this.displayServices;
        console.log(this.services)

      })




  }

}
