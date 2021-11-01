import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-usergroups',
  templateUrl: './usergroups.component.html',
  styleUrls: ['./usergroups.component.scss']
})
export class UsergroupsComponent implements OnInit {
  public loading: boolean;
  constructor(private _route : Router, private UserService : UserService) { }

  displayedColumns: string[] = ['name','Description' ,'Status', 'Action', 'Menus'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  groups : any = {
    name : null,
    description : null,
    status : '',
    groupId : null
  }

  check = 1;
  btnCheck = 'Submit'
  groupMsgs =false ;
  userGroupMsgs = false;
  msg;

  submit()
  {


  //  console.log(this.groups)
  this.userGroupMsgs = false
    if(this.check == 1)
    {


      if(!this.groups.name)
      {
        this.msg = "Please enter the group name"
        this.groupMsgs = true;
      }
      else if(!this.groups.description)
      {
        this.msg = "Please enter the group description"
        this.groupMsgs = true;
      }
      else if(!this.groups.status)
      {
        this.msg = "Please select the group status"
        this.groupMsgs = true;
      }
      else
      {
        this.groupMsgs = false

        this.UserService.createUserGroup(this.groups)
        .then((result) => {

          if(result["responseCode"] == 0)
          {
            localStorage.setItem("groupAdded", "yes")
            window.location.reload()
          }
          else
          {
            this.msg = "Unable to create a user group. Response Message: " + result["responseMessage"]
            this.groupMsgs = true;
          }


        })
        .catch((err) => {
          console.log(err);
  
  
        });
  
  
       // window.location.reload();
      }


     
    }
    else if(this.check == 2)
    {

      console.log(this.groups)

      this.UserService.updateUserGroup(this.groups)
        .then((result) => {

          console.log(result["responseCode"])

          if(result["responseCode"] == 0)
          {
            localStorage.setItem("groupUpdate" , "yes")
            window.location.reload()
          }
          else
          {
            this.msg = "Unable to update " + this.groups.name + " .Response Message: " + result["responseMessage"]
          }
        })
        .catch((err) => {
          console.log(err);


      });


    //  window.location.reload();
    }



  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  editMenus(e)
  {
    this.userGroupMsgs = false
   // this.UserService.userGroupActionData = e;
    localStorage.setItem("groupId", e["groupId"])
    localStorage.setItem("name", e["name"])
    this.UserService.groupActionCheck = 1;
    this._route.navigate(['/group-action'])
  }


  editUser(e)
  {

    this.check = 2;
    console.log(e["name"])

    this.groups.name = e["name"]
    this.groups.description = e["Description"]
    this.groups.status = e["Status"]
    this.groups.groupId = e["groupId"]

    this.btnCheck = 'Update'
    
  }

  deleteUser(e)
  {
    this.groupMsgs = false
    this.userGroupMsgs = false
    this.UserService.delUserGroup(e["groupId"]).then(result => 
      {
        if(result["responseCode"] == 0)
        {
          localStorage.setItem("groupDel", "yes")
          window.location.reload();
        }
        else
        {
          this.msg = "Unable to delete group. Response Message: " + result["responseMessage"]
          this.groupMsgs = true

        }
      })
        .catch((err) => {
          console.log(err);


      });
  }




  userGroupsData = [];
  showContent;
  ngOnInit(): void {
    this.loading = true;

    if(localStorage.getItem("groupDel") == "yes")
    {
      this.msg = "Group deleted successfully."
      this.userGroupMsgs = true;
    }
    else if(localStorage.getItem("groupAdded") == "yes")
    {
      this.msg = "Group created successfully."
      this.userGroupMsgs = true;

    }
    else if(localStorage.getItem("groupUpdate") == "yes")
    {
      this.msg = "Group updated successfully."
      this.userGroupMsgs = true;

    }
    else
    {
      this.userGroupMsgs = false

    }


    this.UserService.getAllUserGroup().subscribe(data => {

      let code = JSON.stringify(data);
      const obj = JSON.parse(code);
      var x = obj["responseObject"]

      console.log(data)


      for(var d of x)
      {
        this.userGroupsData.push({"name" : d["name"], "Description" : d["description"], "Status" : d["status"], "groupId" : d["groupId"]})
      }
      
      this.dataSource = new MatTableDataSource(this.userGroupsData);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;

    })

    localStorage.removeItem("groupAdded")
    localStorage.removeItem("groupDel")
    localStorage.removeItem("groupUpdate")

  }

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
