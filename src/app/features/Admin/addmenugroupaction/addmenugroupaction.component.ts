import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { UserService } from 'src/app/APIs/user/user.service';
import { of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-addmenugroupaction',
  templateUrl: './addmenugroupaction.component.html',
  styleUrls: ['./addmenugroupaction.component.scss']
})
export class AddmenugroupactionComponent implements OnInit {

  constructor(private _route : Router, private UserService : UserService, private http : HttpClient) { }

 

  
  displayedColumns: string[] = ['name','permission' ,'Action'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 


  public actions : any = [
    {
      name : 'CREATE'
    },
    {
      name : "UPDATE"
    },
    {
      name : "DELETE"
    },
    {
      name : "VIEW"
    }
    
  ]


  menuActionGroupRelation  : any = {
    groupId : null,
    menuId : '',
    permission : '1'
  }


  subMenuData : any = {
    groupId : null,
    menuId : '',
    permission : '1'
  }

  exisitngMenuRelation  = []


  public menusData = [];
name;
groupId;

showContent;
menuMsgs = false;
groupMenuMsgs = false;
msg;
haveSub = true;

withSubMenu = [];
isSubMenu(e)
{
  console.log(this.menuActionGroupRelation.menuId)


  this.UserService.getAllMenu().subscribe(data => {

    let toStringCount = JSON.stringify(data);
    const parseCount = JSON.parse(toStringCount);
    var getCountArray = parseCount["responseObject"];
    this.submenus = []
    for(var d of getCountArray["chidMenuList"])
    {
      if(d["menuId"] == this.menuActionGroupRelation.menuId)
      {
        if(typeof d["chidMenuList"] == 'undefined')
        {
          this.haveSub = true;
          break;
        }
        else
        {
          for(var d1 of d["chidMenuList"])
          {
            this.submenus.push({"menuId" : d1["menuId"],"name" : d1["name"] ,"alias" : d1["alias"], "orderNumber" : d1["orderNumber"], "parentMenuId" : d1["parentMenuId"],
            "status" : d1["status"]})
          }
          break;
        }
      }
    }
    if(this.submenus.length > 0)
    {
        this.haveSub = false;
    }
    else
    {
      this.haveSub = true;
    }


  })


 



}





updateGroupMenu : any = {
  menuId : null,
  groupId : null,
  permission : null
}


  submit()
  {
    this.menuMsgs = false
    this.groupMenuMsgs = false;
    
    var permisionss = '';
    var createPerm = (<HTMLInputElement>document.getElementById("createId")).checked; 
    var updatePerm = (<HTMLInputElement>document.getElementById("updateId")).checked; 
    var deletePerm = (<HTMLInputElement>document.getElementById("deleteId")).checked; 
    var viewPerm = (<HTMLInputElement>document.getElementById("viewId")).checked; 


    if(createPerm == true)
    {
      if(updatePerm == true || deletePerm == true || viewPerm == true)
      {
        permisionss = permisionss +  'CREATE|'
      }
      else
      {
        permisionss = permisionss +  'CREATE'
      }
     
      
    }
  
    
    if(updatePerm == true)
    {
      if(deletePerm == true || viewPerm == true)
      {
        permisionss = permisionss +  'UPDATE|'
      }
      else
      {
        permisionss = permisionss +  'UPDATE'
      }
     
    }
    
    if(deletePerm == true)
    {
      if(viewPerm == true)
      {
        permisionss = permisionss +  'DELETE|'
      }
      else
      {
        permisionss = permisionss +  'DELETE'
      }
    }
    
    if(viewPerm == true)
    {
      permisionss = permisionss + 'VIEW'
    }


    console.log(permisionss)

    this.menuActionGroupRelation.groupId = this.groupId;
    this.menuActionGroupRelation.permission = permisionss;

    console.log(this.menuActionGroupRelation)



    if(this.checkUpdate == 1)
    {
      this.groupMenuMsgs = false;
      this.subMenuData.groupId = this.groupId;
      this.subMenuData.permission = this.menuActionGroupRelation.permission


      this.updateGroupMenu.groupId = this.groupId
      this.updateGroupMenu.permission = this.menuActionGroupRelation.permission


      this.UserService.UpdateMenuActionGroupRel(this.updateGroupMenu).then((result) => {
          if(result["responseCode"] == 0)
          {
            localStorage.setItem("grpUpdate", "yes")
            window.location.reload()
          }
          else
          {
            this.msg = "Unable to create group menu. Response Message: " + result["responseMessage"]
            this.menuMsgs = true
          }
       })
              
      .catch((err) => {
        console.log(err);
            
      });
    }
    else
    {
      if(this.haveSub == false)
      {
        this.groupMenuMsgs = false;
        this.subMenuData.groupId = this.groupId;
        this.subMenuData.permission = this.menuActionGroupRelation.permission
    
        this.withSubMenu.push(this.menuActionGroupRelation)
        this.withSubMenu.push(this.subMenuData)
    
        console.log(this.withSubMenu)
  
        var check;
       
  
        if(!this.menuActionGroupRelation.menuId || !this.subMenuData.menuId)
        {
          this.msg = "Please select both menus"
          this.menuMsgs = true
        }
        else if(createPerm == false && updatePerm == false && deletePerm == false && viewPerm == false)
        {
          this.msg = "Please select at least one supported action"
          this.menuMsgs = true
        }
  
        else
        {

          var checkExisting = false;

          for(var d of this.exisitngMenuRelation)
          {
            if(d["menuId"] == this.menuActionGroupRelation.menuId)
            {
              checkExisting = true
              break;
            }
          }


          if(checkExisting == true)
          {
            this.UserService.createcreateMenuActionGroupRelationteUser(this.subMenuData)
            .then((result1) => {
              if(result1["responseCode"] == 0)
              {
               
                 localStorage.setItem("grpCreated", "yes")
                 window.location.reload()
              }
              else
              {
                console.log("here")
                this.msg = "Unable to create group menu. Response Message: " + result1["responseMessage"]
                this.menuMsgs = true
              }
            
            })
                
        
            .catch((err) => {
              console.log(err);
              
             });
  
          }
          else
          {

            this.UserService.createcreateMenuActionGroupRelationteUser(this.menuActionGroupRelation)
            .then((result) => {
    
              console.log(result)
        
              if(result["responseCode"] == 0)
              {
               
                check = true;
              
              }
              else
              {
                check = false;
              }
    
              this.UserService.createcreateMenuActionGroupRelationteUser(this.subMenuData)
              .then((result1) => {
                if(result1["responseCode"] == 0)
                {
                 
                   localStorage.setItem("grpCreated", "yes")
                   window.location.reload()
                }
                else
                {
                  this.msg = "Unable to create group menu. Response Message: " + result1["responseMessage"]
                  this.menuMsgs = true
                }
              
              })
                  
          
              .catch((err) => {
                console.log(err);
                
               });
    
            
        
            })
                
        
            .catch((err) => {
              console.log(err);
              
             });
          }

          }

      }
      else
      {
        this.withSubMenu = []
  
        if(!this.menuActionGroupRelation.menuId)
        {
          this.msg = "Please select the menu"
          this.menuMsgs = true
        }
        else if(createPerm == false && updatePerm == false && deletePerm == false && viewPerm == false)
        {
          this.msg = "Please select at least one supported action"
          this.menuMsgs = true
        }
  
        else
        {
          this.menuMsgs = false
    
          console.log(this.menuActionGroupRelation)
          this.UserService.createcreateMenuActionGroupRelationteUser(this.menuActionGroupRelation)
        .then((result) => {
    
    
          if(result["responseCode"] == 0)
          {
            localStorage.setItem("grpCreated", "yes")
            window.location.reload()
          }
          else
          {
            this.msg = "Unable to create group menu. Response Message: " + result["responseMessage"]
            this.menuMsgs = true
          }
          
    
        })
            
    
        .catch((err) => {
          console.log(err);
          
         });
      }
  
      }
    }

    
  }

  checkUpdate;

  editMenudata(e)
  {
    var checkcreate = false;
    var checkUpdate = false;
    var checkdelete = false;
    var checkview = false;
    
    this.checkUpdate = 1;

    this.menuMsgs = false
    this.groupMenuMsgs = false;

    var x  = e["permission"].split("|")
    for(var d of x)
    {
      if(d == "CREATE")
      {
        checkcreate = true;
       // (<HTMLInputElement>document.getElementById("createId")).checked = true
      }
      else if(d == "UPDATE"){
        checkUpdate = true;
     //   (<HTMLInputElement>document.getElementById("updateId")).checked = true
      }
      else if(d == "DELETE"){
        checkdelete = true;
       // (<HTMLInputElement>document.getElementById("deleteId")).checked = true
      }
      else if(d == "VIEW"){
        checkview = true;
        //(<HTMLInputElement>document.getElementById("viewId")).checked = true
      }
    
    }


    if(checkcreate == true)
    {
      (<HTMLInputElement>document.getElementById("createId")).checked = true
    }
    else
    {
      (<HTMLInputElement>document.getElementById("createId")).checked = false
    }

    if(checkUpdate == true)
    {
      (<HTMLInputElement>document.getElementById("updateId")).checked = true
    }
    else
    {
      (<HTMLInputElement>document.getElementById("updateId")).checked = false
    }

    if(checkdelete == true)
    {
      (<HTMLInputElement>document.getElementById("deleteId")).checked = true
    }
    else
    {
      (<HTMLInputElement>document.getElementById("deleteId")).checked = false
    }

    if(checkview == true)
    {
      (<HTMLInputElement>document.getElementById("viewId")).checked = true
    }
    else
    {
      (<HTMLInputElement>document.getElementById("viewId")).checked = false
    }



    if(e["parentMenuId"] > 1)
    {
      for(var d of this.menusData)
      {
      
        if(d["menuId"] == e["parentMenuId"])
        {
  
          this.menuActionGroupRelation.menuId = d["menuId"]

          for(var d1 of d["childMenuList"])
          {
            this.submenus.push({"menuId" : d1["menuId"],"name" : d1["name"] ,"alias" : d1["alias"], "orderNumber" : d1["orderNumber"], "parentMenuId" : d1["parentMenuId"],
            "status" : d1["status"]})
          }
  
          break;
        
        }
      }

      if(this.submenus.length > 0)
      {
          this.haveSub = false;
      }
      else
      {
        this.haveSub = true;
      }

      this.subMenuData.menuId = e["menuId"]

      this.updateGroupMenu.menuId = e["menuId"]
  


    }
    else
    {

      this.submenus = []

      if(this.submenus.length > 0)
      {
          this.haveSub = false;
      }
      else
      {
        this.subMenuData.menuId = ''
        this.haveSub = true;
      }
      
     
      this.menuActionGroupRelation.menuId = e["menuId"]
      this.updateGroupMenu.menuId = e["menuId"]
    }


  

    console.log(e)
  }
  
  delMenuData(e)
  {

    this.menuMsgs = false
    this.groupMenuMsgs = false;

    console.log(e)
    this.menuActionGroupRelation.groupId = e["groupId"]
    this.menuActionGroupRelation.permission = e["permission"]
    this.menuActionGroupRelation.menuId = e["menuId"]

    console.log(this.menuActionGroupRelation)
    console.log(e)


    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        groupId: e["groupId"],
        menuId: e["menuId"],
        permission : e["permission"]
      }
    }

    this.http.delete(environment.api_url + '/acl/deleteMenuActionGroupRelation', options).subscribe(s => {


      console.log(s)
      if(s["responseCode"] == 0)
      {

        localStorage.setItem("grpMenuDel", "yes")
        window.location.reload();
      }
      else
      {
        this.msg = "Unable to delete the group menu."
        this.menuMsgs = true
      }
    })
/*
    this.UserService.delMenuActRel(this.menuActionGroupRelation).then(result => {
     //   console.log(result)
      })
      
    .catch((err) => {
      console.log(err);
      
     });
     */
     
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public loading: boolean;


  submenus = []
  ngOnInit(): void {
    
 
    if(localStorage.getItem("grpMenuDel") == "yes")
    {
      this.msg = "Group Menu deleted successfully."
      this.groupMenuMsgs = true
    }
    else if(localStorage.getItem("grpCreated") == "yes")
    {
      this.msg = "Group Menu Created successfully."
      this.groupMenuMsgs = true
    }
    else if(localStorage.getItem("grpUpdate") == "yes")
    {
      this.msg = "Group Menu Updated successfully."
      this.groupMenuMsgs = true
    }
    else
    {
      this.groupMenuMsgs = false;
    }

    
/*
    if(this.UserService.groupActionCheck == 1)
    {
      this.name =  localStorage.getItem("name")
      this.groupId = localStorage.getItem("groupId")

    }
    */

    this.name =  localStorage.getItem("name")
    this.groupId = localStorage.getItem("groupId")
   

    this.loading= true;
    this.UserService.getMenuActionRelation().subscribe(data => {
      
      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];
      //console.log(getCountArray)

      for(var d of getCountArray)
      {
        if(d["groupId"] == this.groupId)
        {

          this.exisitngMenuRelation.push({"menuId" : d["menuId"],"parentMenuId" : d["menuData"]["parentMenuId"] ,"name" : d["menuData"]["name"], "groupId" : d["groupId"], "permission" : d["permission"]})
        }
      }

      this.dataSource = new MatTableDataSource(this.exisitngMenuRelation);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;

    

    })




    this.UserService.getAllMenu().subscribe(data => {

      let toStringCount = JSON.stringify(data);
      const parseCount = JSON.parse(toStringCount);
      var getCountArray = parseCount["responseObject"];

      
      for(var d of getCountArray["chidMenuList"])
      {
        this.menusData.push({"menuId" : d["menuId"],"name" : d["name"] ,"alias" : d["alias"], "orderNumber" : d["orderNumber"], "parentMenuId" : d["parentMenuId"],
        "status" : d["status"], "childMenuList" : d["chidMenuList"]})
      }

   

    })


    localStorage.removeItem("grpMenuDel")
    localStorage.removeItem("grpCreated")
    localStorage.removeItem("grpUpdate")


  }

}
