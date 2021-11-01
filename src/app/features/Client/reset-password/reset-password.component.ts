import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/APIs/user/user.service';
import { config } from 'src/app/Configs/Config';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private config : config,  private _route : ActivatedRoute, private UserService : UserService, private route : Router) { }

  msg;
  checkEmail = false;
  showPassword;
  code;

  showErrorMsg;

  email;


  emails : any = {
    userEmail : null
  }
  



  submit()
  {

    
    var atleastFive = "Please provide your Password of at least 5 characters";
    var upperCase = "Your password needs an upper case letter";
    var lowerCase = "Your password needs a lower case letter";
    var numchar = "Password should contain atleast one number and one special character";
    var dontMatch  = "Passwords don't match! Please try again";

    var pass1 = (<HTMLInputElement>document.getElementById("password")).value;
    var pass2 = (<HTMLInputElement>document.getElementById("password1")).value;

    var msg = this.config.validatePassword(pass1, pass2)
    if(msg == 7)
    {
      console.log("password correct")

      this.UserService.getResetPassword(this.code, pass1).subscribe(data =>
        {
          //console.log(data);
          let code = JSON.stringify(data);
          const obj = JSON.parse(code);
          var msgs = obj["responseMessage"]

          if(msgs == "Email verified successfully.")
          {
            this.UserService.isVerified = 1;
            this.route.navigate(['/login'])
          }

          console.log(msgs)
          

          
        })

    } 
    else if( msg == 1 )
    {
      this.showErrorMsg = atleastFive
      this.checkEmail = true

      console.log(msg)
    }
    else if(msg == 2)
    {
      this.showErrorMsg = upperCase
      this.checkEmail = true
    }
    else if(msg == 3)
    {
      this.showErrorMsg = lowerCase
      this.checkEmail = true
    }
    else if(msg == 4)
    {
      this.showErrorMsg = numchar
      this.checkEmail = true
    }
    else if(msg == 5)
    {
      this.showErrorMsg = dontMatch
      this.checkEmail = true
    }
    
    

  }

  ngOnInit(): void {

    this._route.queryParams
    .subscribe(params => {
      console.log(params["code"]);
     // this.code = params["code"]

      var x = params["code"]
      var email = x.slice(36)
      var originalCode = x.slice(0, 36)
      var decodedEmail = atob(email)
      console.log(decodedEmail)
      console.log(originalCode)

      

      this.code = originalCode;
      this.emails.userEmail = decodedEmail;
    
    })
  }

}
