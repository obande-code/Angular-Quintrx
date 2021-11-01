import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  showContent;

  constructor(public router : Router) {
/*
    console.log(route.url)

    if(route.url == '/login')
    {
      this.showContent = false;
    }
    else
    {
      this.showContent = true;
    }
    */
    
/*    const currentUser: any = this.auth.currentUserValue;
    console.log("hi")

    if(currentUser)
    {
      this.showContent = true;
    }
    else
    {
      this.showContent = false;
    }
    */


/*
    _route.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showContent = false;
        } else {
          // console.log("NU")
          this.showContent = true;
        }
      }
    });
    */
    
   }
   

 

  ngOnInit(): void {
    
  }

}
