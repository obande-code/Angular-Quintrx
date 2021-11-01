import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.authenticationService.logout();
    document.location.reload();
  }

}
