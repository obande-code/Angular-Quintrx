import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {
  public loading: boolean;
  constructor(private _route : Router, private UserService : UserService) { }

  displayedColumns: string[] = ['name', "documentid" ,"Action"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) myTable : MatTable<any>;


  public serviceslist = []
  displayServices = []
  sortDisplayServices = []

  serviceMasterData : any = {
    serviceMasterId : null,
    serviceName: null,
    documentId : ''
  }

  check = 1;




  btnName = 'Add Service'

  editUser(e)
  {
    this.successcheck = false;
    this.serviceMsgs = false;
    this.check = 2;
    this.btnName = 'Update Service'

    console.log(e["serviceName"])

    this.serviceMasterData.serviceName = e["serviceName"];
    this.serviceMasterData.documentId = e["documentId"];
    this.serviceMasterData.serviceMasterId = e["serviceMasterId"]

    //console.log(e["documentId"])
    //console.log(this.serviceMasterData)


     /*
    this.UserService.updateUserGroup(this.serviceMasterData)
    .then((result) => {})

    .catch((err) => {
      console.log(err);

      });
      */


      /*
    this.serviceslist = [];

    this.serviceslist.push(e);
    console.log(this.serviceslist);

    this.UserService.servlist = this.serviceslist;
    this.UserService.check = 2;


   // window.location.reload();



    this._route.navigate(['/provider']);
    */


  }



  deleteUser(e)
  {
    this.successcheck = false;
    this.serviceMsgs = false;

    console.log(e["serviceMasterId"])

    this.UserService.delServiceMaster(e["serviceMasterId"])

        .then((result) => {

          console.log(result)
          
          if(result["responseCode"] == 0)
          {
         
            localStorage.setItem("serviceDel", "yes")
            window.location.reload();
          }
          else
          {
            this.msg = "Unable to delete Service: Response Message: " + result["responseMessage"]
            this.serviceMsgs = true;
          }
          
         })
        .catch((err) => {
          console.log(err);


        });

    /*
    var id = e["serviceId"];
    console.log(e);
   // console.log(id)
    this.UserService.delServicelist(id)

    .then((result) => {
      console.log("success")


     })
    .catch((err) => {
      console.log(err);


    });
    */
  }

  serviceCheck  = false;
  documentCheck = false;
  msg;
  serviceMsgs = false;

  submit()
  {
    this.successcheck = false;
    this.serviceMsgs = false


    if(this.check == 1)
    {
     // this.serviceMasterData.documentId = 1;
    console.log(this.serviceMasterData)

      if(!this.serviceMasterData.serviceName)
      {
        this.msg = "Service Name is required";
        this.serviceMsgs = true;
        this.serviceCheck = true;
        this.documentCheck = false;

      }
      else if(!this.serviceMasterData.documentId)
      {
        this.msg = "Document Id is required";
        this.serviceMsgs = true;
        this.serviceCheck = false;
        this.documentCheck = true;

      }
      else
      {
        this.serviceMsgs = false;
        this.serviceCheck = false;
        this.documentCheck = false;
        this.UserService.createMasterService(this.serviceMasterData)
        .then((result) => {
          if(result["responseCode"]== 0)
          {
            localStorage.setItem("serviceAdd", "yes")
            window.location.reload()
          }
        })
        .catch((err) => {
          console.log(err);

        });

      }

    /*
      this.UserService.createMasterService(this.serviceMasterData)
      .then((result) => {
        if(result["responseCode"]== 0)
        {
          window.location.reload()
        }
      })
      .catch((err) => {
        console.log(err);

      });
      */




    }
    else if(this.check == 2)
    {
      console.log(this.serviceMasterData)

      if(!this.serviceMasterData.serviceName)
      {
        this.msg = "Service Name is required";
        this.serviceMsgs = true;
        this.serviceCheck = true;
        this.documentCheck = false;

      }
      else if(!this.serviceMasterData.documentId)
      {
        this.msg = "Document Id is required";
        this.serviceMsgs = true;
        this.serviceCheck = false;
        this.documentCheck = true;

      }
      else
      {
        this.serviceMsgs = false;
        this.serviceCheck = false;
        this.documentCheck = false;
      

        this.UserService.updateServiceMaster(this.serviceMasterData)
        .then((result) => {
          console.log(result)
          if(result["responseCode"]== 0)
          {
            localStorage.setItem("serviceUpdate", "yes")
            window.location.reload()
          }
          //this.myTable.renderRows();
        })
        .catch((err) => {
          console.log(err);
      
        });

      }

     
    
    }

  }

  showContent;
  /*
  colors = [{ statusdisplay: "Active", color: "green" }, { statusdisplay: "Inactive", color: "red" }];
  getColor(status) {
    return this.colors.filter(item => item.statusdisplay === status)[0].color
    // could be better written, but you get the idea
  }
  */

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  displayDocuments = [];
  successcheck = false;

  ngOnInit(): void {
    this.loading = true;

    if(localStorage.getItem("serviceAdd") == "yes")
    {
      this.msg = "Service Added Successfully"
      this.successcheck = true

    }
    else if(localStorage.getItem("serviceUpdate") == "yes")
    {
      this.msg = "Service Updated Successfully"
      this.successcheck = true;
    }
    else if(localStorage.getItem("serviceDel") == "yes")
    {
      this.msg = "Service Deleted Successfully"
      this.successcheck = true;
    }
    else
    {
      this.successcheck = false;
    }



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
          this.displayServices.push({"serviceMasterId" : d["serviceMasterId"], "serviceName" : d["serviceName"], "documentId" : d["documentId"]});

        }

/*
        for(var d of getCountArray)
        {
          if(d["status"] == true)
          {
            checkStatus = 'Active';
            //(<HTMLInputElement>document.getElementById("statusServ")).setAttribute('style', 'color: green;');
          }
          else if(d["status"] == false)
          {
            checkStatus = 'Inactive';
          }
          //console.log(d[4]);
          this.displayServices.push({"serviceId" : d["serviceId"], "serviceName" : d["serviceName"], "serviceCost" : d["serviceCost"], "servicePrice" : d["servicePrice"] ,"status" : d["status"], "statusdisplay" : checkStatus, "providerId" : d["providerId"]});

        }
*/

        this.sortDisplayServices = this.displayServices.reverse();

        this.dataSource = new MatTableDataSource(this.sortDisplayServices);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;




/*

        */

       // console.log(getCountArray)
      // (<HTMLInputElement>document.getElementById("headers")).setAttribute('style', 'color: green;');


      })

      this.UserService.getMasterDocDetails().subscribe(data => {
        let toStringCount = JSON.stringify(data);
          const parseCount = JSON.parse(toStringCount);
          var getCountArray = parseCount["responseObject"];

          for(var d of getCountArray)
          {
            this.displayDocuments.push({"documentName" : d["documentName"], "documentId" : d["documentId"], "documentType" : d["documentType"]})
          }
      })





   localStorage.removeItem("serviceAdd")
   localStorage.removeItem("serviceUpdate")
   localStorage.removeItem("serviceDel")


  }


}
