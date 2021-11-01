import { Component, OnInit } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/APIs/user/user.service';
import { data } from 'jquery';

@Component({
  selector: 'app-verified-email',
  templateUrl: './verified-email.component.html',
  styleUrls: ['./verified-email.component.scss']
})
export class VerifiedEmailComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private UserService : UserService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params["code"]);
      
    this.UserService.getVerified(params["code"]).subscribe(data => {
      console.log(data)
    })
  })

  }
/*
    verifyEmail(): Observable<any>{
      return this.httpClient.get<any>(environment.api_url+'/verify?code=' + this.route.params)
    }
    */
}

