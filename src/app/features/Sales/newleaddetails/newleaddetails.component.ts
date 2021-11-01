import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/APIs/user/user.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { group } from '@angular/animations';
import { LegalstatusComponent } from '../../Legal/legalstatus/legalstatus.component';

@Component({
  selector: 'app-newleaddetails',
  templateUrl: './newleaddetails.component.html',
  styleUrls: ['./newleaddetails.component.scss']
})


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

export class NewleaddetailsComponent implements OnInit {

  packagesData : FormGroup;

  showErrMsg = false;
  errMessage;



  constructor(private UserService : UserService, private fb : FormBuilder) {

    this.packagesData = this.fb.group({
      packages : this.fb.array([])
    })
    this.packages().push(this.newPackage());
    this.servicedatas(0).push(this.newService());

   }
   msg;
   msg2;
   checkPkg;
   checkPrice;

   isStatus = false;
   isStatus1 = true;
   isPackage = false;
   isSend = true;
   isCode = false;
   addedPackages = []
   item;

   createNewPackage : any = {

    "packageName" : null,
    "clientId" : null,
    "packagePrice" : null,
    "comments" : "hello",
    "userDetailId" : "31",

    "serviceMasterData" : []



  }


  packages(): FormArray {
    return this.packagesData.get("packages") as FormArray
  }


  newPackage(): FormGroup {
    return this.fb.group({
      packageName: ['', Validators.required],
      clientId: ['', Validators.required],
      packagePrice: ['', Validators.required],
      userDetailId : '',
      serviceData:this.fb.array([])
    })
  }


  addPackage() {
    this.packages().push(this.newPackage());
  }

  removePackage(empIndex:number) {
    this.packages().removeAt(empIndex);
  }


  servicedatas(empIndex:number) : FormArray {
    return this.packages().at(empIndex).get("serviceData") as FormArray
  }



  newService(): FormGroup {
    return this.fb.group({
      service: ['1', Validators.required],
      serviceAlias: ['', Validators.required],
      servicePrice: ['', Validators.required],
    })
  }


  addServiceData(empIndex:number) {
    this.servicedatas(empIndex).push(this.newService());
  }

  removeServiceData(empIndex:number,skillIndex:number) {
    this.servicedatas(empIndex).removeAt(skillIndex);
  }

  onChangedService(event)
  {

  }



   players : any = {
     name : '1'
   }
  selected = "----"
  data = []
  update(e){
   // this.selected = e.target.value
   //console.log(this.pkg);
   //console.log(this.packages);
    console.log(e);
    this.data = e;
    console.log(this.data)

  }


  public documents = [
    {
      name : "CBSV"
    },
    {
      name : "MSA"
    },
    {
      name : "SAT"
    }
  ]

  displayAllServices = []
  getAllServices = []


  createPackage()
  {

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

        console.log(this.displayAllServices)

       // console.log(getCountArray)
        this.getAllServices = this.displayAllServices;
        console.log(this.getAllServices)




      })






    this.isPackage = true;
   /*
    for(var d of this.pkg)
    {
      return d["serviceData"]
    }
    */

  }


  makeNewService = [];
  makeNewPackageData : any = {

    packageName : null,
    clientId : null,
    packagePrice : null,
    comments : "N/A",
    serviceMasterData : []



  }

  makeNewPackageData1 = [
    {
      packageName : null,
      packagePrice : null,
      clientId : null,
      serviceMasterData : []
    }
  ];

  packagesArray = []
  checkpkgFail = false;
  sendPackage()
  {


    //console.log(this.data)
    var totalP = 0;
    var isPrice;

    console.log(this.packagesData.value["packages"])


    for(var d of this.packagesData.value["packages"])
    {


      console.log(d["packageName"]);
      //console.log(d["packagePrice"]);

      for(var d1 of d["serviceData"])
      {

       // console.log(d1["service"]["serviceMasterId"])
        if(d1["servicePrice"] > 0)
        {
          totalP = totalP + d1["servicePrice"];
          this.makeNewService.push({"serviceMasterId" : d1["service"]["serviceMasterId"], "serviceAlias" : d1["serviceAlias"], "servicePrice":  d1["servicePrice"] })
        }
        else
        {
          this.makeNewService.push({"serviceMasterId" : d1["service"]["serviceMasterId"], "serviceAlias" : d1["serviceAlias"], "servicePrice":  d1["servicePrice"] })
        }

       // this.makeNewService.push({"serviceMasterId" : 177, "serviceAlias" : d1["serviceAlias"], "servicePrice":  d1["servicePrice"] })


      //  console.log()
       // d1["service"]["serviceId"]
      }

      if(totalP == d["packagePrice"])
      {
        //this.makeNewPackageData.packageName = d["packageName"];
        //this.makeNewPackageData.packagePrice = d["packagePrice"];
        //this.makeNewPackageData.clientId = 1;
        //this.makeNewPackageData.serviceMasterData = this.makeNewService;
        this.packagesArray.push({"packageName" : d["packageName"], "comments" : "N/A" ,"packagePrice" : d["packagePrice"], "clientId" : 1, "serviceMasterData" : this.makeNewService, "userDetailId" : this.UserService.userDetailId})
        totalP = 0;
        this.makeNewService = []
        //this.packagesArray.push(this.makeNewPackageData);
        console.log(this.packagesArray)

        isPrice = true;

      }
      else
      {

        console.log( d["packagePrice"]);
        console.log(totalP);
        totalP = 0
      //  alert("Pckage price must be equal to the services price")
        this.makeNewService = [];
        this.packagesArray = [];
        isPrice = false

        break;
      }




     // console.log(this.makeNewPackageData.packageName)

      /*
      this.UserService.addPackage(this.makeNewPackageData)
        .then((result) => {

          //this.makeNewService = [];

          console.log(this.makeNewService)
        })
        .catch((err) => {
          console.log(err);

        });

        this.makeNewService = []
        */

    }

    if(this.packagesData.valid)
    {
      console.log("ok")
    }
    else if(this.packagesData.invalid)
    {
      this.showErrMsg = true;
      this.errMessage = "Please fill the form with valid information"
      console.log("not ok")
    }


    /*

    if(isPrice == true)
    {
      //console.log("ok")
      this.item = "bkg"
      this.checkPrice = false;

      for(var d of this.packagesArray)
      {
        console.log(d)
        this.UserService.addPackage(d)
        .then((result) => {
          this.addedPackages.push({'name' : this.UserService.pkgName})
       //   console.log(result["responseMessage"])
          if(result["responseMessage"] == 'Something Went Wrong')
          {

            this.msg = "Unable to create package. Response Message: " + result["responseMessage"]
            this.checkpkgFail = true;
            this.checkPkg = false;
            this.packagesData.reset();
            this.packagesArray = []
          }
          else
          {
            this.msg = "Package created successfully"
            this.checkPkg = true;
            this.checkpkgFail = false;
            this.packagesData.reset();
            this.packagesArray = []
          }
          //this.makeNewService = [];

          //console.log(this.makeNewService)
        })
        .catch((err) => {
          console.log(err);

        });
      }


    }
    else if(isPrice == false)
    {
      this.msg2 = "Package price must be equal to the services price"
      this.checkPrice = true;
      console.log("not ok")
    }


    console.log(this.addedPackages)
*/

   // this.packagesData.value["packages"].reset();
/*
    this.makeNewService.push({"serviceAlias" : this.data["serviceName"], "serviceMasterId" : 177, "servicePrice" : this.data["servicePrice"]});

    console.log(this.makeNewService)
    this.createNewPackage.packageName = this.pkg.packageName;
    this.createNewPackage.clientId = 1;
    this.createNewPackage.packagePrice = this.data["servicePrice"]
    this.createNewPackage.serviceMasterData = this.makeNewService;
    console.log(this.createNewPackage)


    this.UserService.addPackage(this.createNewPackage)
    .then((result) => {


    })
    .catch((err) => {
      console.log(err);

    });

    */
  }




  sendDocuments()
  {
    this.isSend = false;
        this.isCode = true;
/*
    //document.getElementById("statusButtons").style.display="";
    document.getElementById("sendDocuButton").style.display="none";
    if(this.UserService.underClient == this.UserService.code)
    {
      document.getElementById("underLegal").style.display="none";
    }
    else if(this.UserService.underLegal == this.UserService.code)
    {
      document.getElementById("underClient").style.display="none";
    }

*/
    console.log(this.userEmail)

    this.UserService.sendDocuments(this.userEmail)
    .then((result) => {


    })
    .catch((err) => {
      console.log(err);

    });


/*
    if(this.UserService.statusDone == this.UserService.code)
    {
     // document.getElementById("PkgHeading").style.display="";
      document.getElementById("crtpackage").style.display="";
      document.getElementById("statusButtons").style.display="none";
     document.getElementById("sendDocuButton").style.display="none";
     document.getElementById("sendDecuheading").style.display="none";
     document.getElementById("serviceList").style.display="none";
     document.getElementById("docuList").style.display="none";

    }

*/
  }

  name;
  email ;
  companyname;
  website ;
  address ;
  place ;
  city ;
  state;
  zip ;
  userEmail;
  userCode;

  stateName;
  cityName;
  comments;

  public displayServices = []
  public dis = [];
  showContent = false;

  ngOnInit(): void {
    setTimeout(() => this.showContent = true, 250);

    console.log(this.UserService.clientData["name"]);

    this.userEmail = this.UserService.clientData["userEmail"];
    this.userCode = this.UserService.clientData["code"];

    this.name = this.UserService.clientData["name"];
    this.email = this.UserService.clientData["email"]
    this.companyname = this.UserService.clientData["companyname"]
   // this.website = this.UserService.clientData["companyname"]

    this.place = this.UserService.clientData["address"];
    this.city = this.UserService.clientData["city"];
    this.state = this.UserService.clientData["state"]
    this.zip = this.UserService.clientData["zipcode"]
    console.log(this.city);
/*
    this.UserService.getStates().subscribe(data => {

      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];

      for(var d of getCountArray)
      {
        if(d["id"] == this.state)
        {
          this.stateName = d["name"];
          break;
        }
      }
      console.log(this.stateName);

      this.UserService.getCity().subscribe(data => {

        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray1 = parseCount["responseObject"];
        //console.log(getCountArray)

        for(var d of getCountArray1)
        {
          if(d["id"] == this.city)
          {
            this.cityName = d["name"];
            break;
          }
        }

        console.log(this.cityName);
        this.address = this.place + ", " + this.cityName + ", " + this.stateName + ", " + this.zip;


      // this.address = 'hello'
        console.log(this.address);

      })
    })
    */
    console.log(this.UserService.userDetailId)
      this.UserService.getAllPackage(this.UserService.userDetailId).subscribe(data => {
        var counter = 0;
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        console.log(getCountArray)


        for(var d of getCountArray)
        {
          for(var d1 of  d["packageServiceRelData"])
          {
            //console.log(d1)
            this.displayServices.push({"serviceAlias" : d1["serviceAlias"], "servicePrice" : d1["servicePrice"], "comments" : d["comments"]})
          }
          this.addedPackages.push({"name" : d["packageName"]})
          //console.log(d["packageServiceRelData"][counter]["serviceAlias"]);
          //this.displayServices.push({"serviceAlias" : d["packageServiceRelData"][counter]["serviceAlias"], "servicePrice" : d["packageServiceRelData"][counter]["servicePrice"], "comments" : d["comments"]})
         //counter = counter + 1;
          this.comments = d["comments"];
        }
       console.log(counter)
      })

      this.dis = this.displayServices
      console.log(this.dis)





  //  var s  = new LegalstatusComponent(this.UserService);
    console.log(this.UserService.userDetailId)
   // console.log(s.legalStat)
   this.isStatus = true;
   this.isStatus1 = false;

     this.isSend = false;
     this.isCode = true;


/*
    if(this.userCode == 7)
    {
      this.isStatus = true;
      this.isStatus1 = false;
    }


    console.log(this.userCode)
    if(this.userCode == 6)
    {
      this.isStatus = true;
      this.isStatus1 = false;

        this.isSend = false;
        this.isCode = true;

    }
    */




  }




}
