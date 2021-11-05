import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private UserService : UserService, private _route : Router) { }
  completed = 0;
  needsAttention = 0;
  canceled = 0;
  archived = 0;
  inProgress = 0;

  /*

  inProgress=0;
  completed=1,
  needsAttention=2,
  canceled=3,
  archived=4,
  */

  completedReports()
  {
   localStorage.setItem("orderStatus", "1")
   localStorage.setItem("inComp" , "yes")
   this._route.navigate(['/REPORT_MANAGEMENT'])
  }

  naviToOrder(){
   // this._route.navigate(['/REPORT'])
  }

  orderReport(){
    this._route.navigate(["ORDER_REPORT"])
  }



  attentionReports(){
   // this.UserService.orderStatusCode = 2;
    localStorage.setItem("orderStatus", "2")
    localStorage.setItem("inNeeds" , "yes")
    this._route.navigate(['/REPORT_MANAGEMENT'])

  }
  archivedReports()
  {
   // this.UserService.orderStatusCode = 4;
    localStorage.setItem("orderStatus", "4")
    localStorage.setItem("inArchived" , "yes")
    this._route.navigate(['/REPORT_MANAGEMENT'])
  }


  // ---------------- In Progress Method Added -------------------------

  inProgressReports()
  {
   // this.UserService.orderStatusCode = 4;
    localStorage.setItem("orderStatus", "0")
    localStorage.setItem("inProgress" , "yes")
    this._route.navigate(['/REPORT_MANAGEMENT'])
  }


  ngOnInit(): void {

    this.UserService.getMyDashboardDetails().subscribe(data => {
      let code = JSON.stringify(data);
      const obj = JSON.parse(code);
      var counts = obj["responseObject"]

      this.completed = counts["completed"]
      this.needsAttention = counts["needsAttention"]
      this.canceled = counts["canceled"]
      this.archived = counts["archived"]
      this.inProgress = counts["inProgress"]

    })




  }

}
