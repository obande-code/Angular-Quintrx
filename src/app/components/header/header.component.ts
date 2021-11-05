import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenData } from 'src/app/modals/token-data.model';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { ElementRef } from '@angular/core';
import { UserService } from 'src/app/APIs/user/user.service';
import {FaqItem} from 'ngx-material-faq';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMobile = window.innerWidth <= 1023;
  userId;


  tokenData$: Observable<TokenData>;
  menuData$: Observable<any>;
  menus = [];
  list: FaqItem[] = [
    {
          question: 'Why does it think the jQuery plugin is missing?',
          answer: 'Remember: load jQuery before AngularJS if you are using jQuery plugins!'
        },
        {
          question: 'How do I access the DOM from a controller?',
          answer: 'DO NOT perform DOM selection/traversal from the controller. The HTML hasn\'t rendered yet. Look up \'directives\'.'
        }
  ];
  //showMenu = false;



  constructor(private el: ElementRef, public router: Router, private authenticationService: AuthenticationService, private UserService : UserService) {
    this.menuData$ = this.authenticationService.menusSubject.asObservable();
    if (localStorage.getItem('USER_EMAIL'))
      this.authenticationService.getUserGroupRelationDetailByEmail(localStorage.getItem('USER_EMAIL')).subscribe(x => {
      //  console.log(x["responseObject"]["userId"])

        this.UserService.userId = x["responseObject"]["userId"]
/*

        if(x["responseObject"]["userGroupRelData"][0]["groupDataProfile"]["name"] == "Client")
        {
          if(x["responseObject"]["userStatusCode"] > 3)
          {
            console.log("hi")
            this.showMenu = true;
          }
        }
        else if(x["responseObject"]["userGroupRelData"][0]["groupDataProfile"]["name"] == "Admin")
        {
          this.showMenu = true;
        }
        else if(x["responseObject"]["userGroupRelData"][0]["groupDataProfile"]["name"] == "Legal")
        {
          this.showMenu = true;
        }
        else if(x["responseObject"]["userGroupRelData"][0]["groupDataProfile"]["name"] == "Sales")
        {
          this.showMenu = true;
        }
        else if(x["responseObject"]["userGroupRelData"][0]["groupDataProfile"]["name"] == "Account")
        {
          this.showMenu = true;
        }
        else
        {
          this.showMenu = false;
        }
        */

        this.authenticationService.menusSubject.next(authenticationService.getUserMenuFromJson(x));
        //console.log(x["responseObject"]["userGroupRelData"]["name"])
        //console.log(x["responseObject"]["userGroupRelData"][0]["groupDataProfile"]["name"])




      });
      else
      {

      }

  }

  ngOnInit(): void {
    this.tokenData$ = this.authenticationService.currentUserSubject.asObservable();
    this.onCloseWhenClickingOnMobile();
    this.menuData$.subscribe(x => {
      if (Array.isArray(x))
        this.menus = x;
    })
/*
    var email = localStorage.getItem('USER_EMAIL');

    this.authenticationService.getUserGroupRelationDetailByEmail(email).subscribe(x => {
      console.log(x["responseObject"]["userStatusCode"])





    })
    */






  }

  navigate(){
    var userType = localStorage.getItem('profileType')
    //console.log(userType)
    if (userType == 'Client') {
      this.router.navigate(["/HOME"])
    }
    else if (userType == 'Admin') {
      this.router.navigate(["/ADMIN_DASHBOARD"])
    }
    else if (userType == 'Legal') {
      this.router.navigate(["/NEW_CLIENTS"])
    }
    else if (userType == 'Sales') {
      this.router.navigate(["/sales-dashboard"])
    }
    else if (userType == 'Account') {
      this.router.navigate(["/NEW_CLIENTS"])
    }
  }

  goLink(router, permissions) {
    this.router.navigate([`/${router}`])
  }

  logout() {
    this.authenticationService.logout();
    document.location.reload();
  }
  submenublur(event) {
    if (event.target.getAttribute('aria-expanded') === 'true') {
      setTimeout(() => {
        event.target.click();
      }, 300);
    }
  }
  onCloseOnMobile() {
    this.el.nativeElement.classList.remove('show-menu');
    this.el.nativeElement.classList.add('hide-menu');
  }

  onCloseWhenClickingOnMobile() {
    if (window.innerWidth <= 1023) {
      this.el.nativeElement.addEventListener('click', () => {
        this.onCloseOnMobile();
      });
    }
  }
}
