import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  user1 = {
    role : 'SALES'
  
  }

  user = [
    {
      role : 'SALES'
    },
    {
      role : 'CLIENT'
    },
    {
      role : 'ADMIN'
    },
    {
      role : 'LEGAL'
    }
  ]


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   


    const currentUser: any = this.authenticationService.currentUserValue;
   
    if (currentUser) {

      return true;
      /*
      if(next.data[0] == this.authenticationService.pType)
      {
        console.log(this.authenticationService.pType)
        return true;
      }
      */

    }
    this.authenticationService.logout();
    return false;
  }
}
