import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';
import { TokenData } from 'src/app/modals/token-data.model';

@Component({
  selector: 'app-admin-addmenu',
  templateUrl: './admin-addmenu.component.html',
  styleUrls: ['./admin-addmenu.component.scss']
})



export class AdminAddmenuComponent implements OnInit {

  successMessage = "Menu Added Successfully"
  errorMessage = "Unable to add menu"

  currentUserSubject: BehaviorSubject<TokenData>;

  isLoading$ = false


  currentUser$: Observable<TokenData>;

  showSuccessMsg = false
  showErrorMsg = false







  menuActionGroupRelation  : any = {
    groupId : null,
    menuId : '',
    permission : '1'
  }

  public menusData = [];

  menuName : string;
  menuItems = [];
  groupId;

  exisitngMenuRelation  = []

  subMenuParentId;



  constructor(private UserService : UserService, private _route : Router,
              private http: HttpClient) {
                this.isLoading$ = this.UserService.isLoading$;
               }

  ngOnInit(): void {


    this.UserService.getAllMenu().subscribe(data => {

      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];

      console.log(getCountArray)

      for(var d of  getCountArray["chidMenuList"])
      {
        this.exisitngMenuRelation.push({"menuId" : d["menuId"],"name" : d["name"] ,"alias" : d["alias"], "orderNumber" : d["orderNumber"], "parentMenuId" : d["parentMenuId"],
        "status" : d["status"]})
      }
    })



  }

  navigate() {
    this._route.navigate(['ADMIN_DASHBOARD'])
  }



  menuItem : string = '';
  newList : string[] = [];
  menuItem1 : any = {
    name :  null,
    alias : null,
    parentMenuId : '1',
  }

  menuItem2 : any = {
    name :  null,
  }
  subMenuItem : any = {
      name :  null,
      alias : null,
      parentMenuId : null,
    }





  onSubmit(){





    this.UserService.addMainMenu(this.menuItem1)



    .then((result) => {
      var x = result["responseMessage"];
      if (x == 'Input parameter menu name required.'){
        this.showSuccessMsg = false;
        this.errorMessage = "Please enter Menu name."
        this.showErrorMsg = true;
      }
      else if (x == 'Input parameter alias required.    '){
        this.showSuccessMsg = false;
        this.errorMessage = "Please enter Menu alias."
        this.showErrorMsg = true;
      }
      else if (x == 'Menu name already exist.'){
        this.showSuccessMsg = false;
        this.errorMessage = "Menu name already exists."
        this.showErrorMsg = true;
      }
      else if (x == 'Alias with the same name already exist in the system.'){
        this.showSuccessMsg = false;
        this.errorMessage = "Alias name already exists."
        this.showErrorMsg = true;
      }
      else {
        this.showErrorMsg = false;
        this.showSuccessMsg = true;
      }

    })


    .catch((err) => {
      console.log(err);

    });




    console.log(this.menuItem1)


  }

  addSubMenu(){

    console.log(this.menuActionGroupRelation.menuId)

    this.subMenuItem.parentMenuId = this.menuActionGroupRelation.menuId

    if (!this.subMenuItem.parentMenuId) {
    }
    else {

      this.UserService.addMainMenu(this.subMenuItem)
     .then((result) => {
      var x = result["responseMessage"];
      var code = result["responseCode"];
      if (x == "Input parameter menu name required.") {
        this.errorMessage = "Please enter sub menu name"
        this.showErrorMsg = true;
        this.showSuccessMsg = false;
      }
      else if (x == "Input parameter alias required.    ") {
        this.errorMessage = "Please enter sub menu alias"
        this.showErrorMsg = true;
        this.showSuccessMsg = false;
      }
      else if (x == "Menu name already exist.") {
        this.errorMessage = "Menu name already exists."
        this.showErrorMsg = true;
        this.showSuccessMsg = false;
      }
      else if (x == "Alias with the same name already exist in the system.") {
        this.errorMessage = "Alias name already exists."
        this.showErrorMsg = true;
        this.showSuccessMsg = false;
      }
      else {
        this.showErrorMsg = false;
        this.showSuccessMsg = true;
      }
     })

     .catch((err) => {
       console.log(err);


     });

    }








    console.log(this.subMenuItem)




  }

  showMainMenu()
   {

     document.getElementById("mainmenu-form").style.display="";
     document.getElementById("submenu-form").style.display="none";





   }
   showSubMenu()
   {

    document.getElementById("mainmenu-form").style.display="none";
    document.getElementById("submenu-form").style.display="";

   }


}


