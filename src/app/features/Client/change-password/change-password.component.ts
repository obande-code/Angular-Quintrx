import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'protractor';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/APIs/user/user.service';

import { config } from 'src/app/Configs/Config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public loading: boolean;
  showPassword;
  checkEmail = false;
  code

  showErrorMsg;

  showSuccessMsg = false
  successMessage

  email;

  emails : any = {
    userEmail : null
  }

  password : any = {
    oldPassword : null,
    newPassword: null
  }


  constructor(private config: config, private UserService: UserService, private _route: ActivatedRoute, private route: Router,
              private httpClient: HttpClient) { }



  ngOnInit(): void {

  }


  changePassword(){
    //console.log("hi")

    this.loading = true


    var wrongPass = "Your old Password is Inccorect"
    var confMsg = "Password Changed Succesfully"

    var samePass = "New password must be different from old password"
    var old_pass = "Please enter your old Password";
    var atleastFive = "Please provide your Password of at least 8 characters";
    var upperCase = "Password needs an upper case letter";
    var lowerCase = "Password needs a lower case letter";
    var numchar = "Password should contain atleast one number and one special character";
    var dontMatch  = "Passwords don't match! Please try again";

    var opass = (<HTMLInputElement>document.getElementById("oldpassword")).value;
    var pass1 = (<HTMLInputElement>document.getElementById("password")).value;
    var pass2 = (<HTMLInputElement>document.getElementById("password1")).value;

    var msg = this.config.validatePassword(pass1, pass2);

     if(opass == pass2){
       console.log("passwords cannot be the same")
       this.showErrorMsg = samePass
       this.checkEmail = true
       this.loading = false
       this.showSuccessMsg = false
     }

    if(opass == '')
    {
      this.showErrorMsg = old_pass
      this.checkEmail = true
      this.loading = false
      this.showSuccessMsg = false
    }
    else if( msg == 1 )
    {
      this.showErrorMsg = atleastFive
      this.checkEmail = true
      this.loading = false
      this.showSuccessMsg = false
    }
    else if(msg == 2)
    {
      this.showErrorMsg = upperCase
      this.checkEmail = true
      this.loading = false
      this.showSuccessMsg = false
    }
    else if(msg == 3)
    {
      this.showErrorMsg = lowerCase
      this.checkEmail = true
      this.loading = false
      this.showSuccessMsg = false
    }
    else if(msg == 4)
    {
      this.showErrorMsg = numchar
      this.checkEmail = true
      this.loading = false
      this.showSuccessMsg = false
    }
    else if(msg == 5)
    {
      this.showErrorMsg = dontMatch
      this.checkEmail = true
      this.loading = false
      this.showSuccessMsg = false
    }
    else if(msg == 7)
    {
        this.UserService.changePassword(this.password.oldPassword, this.password.newPassword)
        .then((result) => {
          console.log(result)
          let code = JSON.stringify(result);
          const obj = JSON.parse(code);
          var x = obj["responseCode"];
          if (x == 1){
            this.showErrorMsg = wrongPass
            this.checkEmail = true
            this.loading = false
            this.showSuccessMsg = false
          }
          else if(x == 0) {
            this.successMessage = confMsg
            this.loading = false
            this.showSuccessMsg = true
            this.checkEmail = false
          }
        })

        .catch((err) => {
          console.log(err);
          this.loading = false
        });
      }

    }

  }
