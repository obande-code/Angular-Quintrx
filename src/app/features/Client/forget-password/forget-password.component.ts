import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';
import { config } from 'src/app/Configs/Config';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private config : config, private UserService: UserService, private _route : Router) { }

msg = "Please enter a valid Email"
checkEmail = false;
  submit()
  {
    var isValid = (<HTMLInputElement>document.getElementById("user-Email")).value;
    console.log(isValid)
    
    console.log()

    if(!this.config.validateEmail(isValid))
    {
      this.checkEmail = true
    }
    else
    {
      this.UserService.getPasswordLink(isValid).subscribe(data =>
        {
          console.log(data);
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var msgs = obj["responseMessage"]

          if(msgs == "Password reset Email link send success.")
          {
            this.UserService.passwordCheck = 1;
            this._route.navigate(['/login']);
          }
          else if(msgs = "User with provided email not found in the system.")
          {
            this.UserService.passwordCheck = 2;
            this._route.navigate(['/register']);
          }

          
        })
    }



  }



  ngOnInit(): void {
  }

}
