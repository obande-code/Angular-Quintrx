import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { OrderReportService } from 'src/app/APIs/order-report.service';
import { UserService } from 'src/app/APIs/user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any = {
    email: null,
    password: null,
    errors: {},
  };

/*
  rememberMe : any = {
    remember : true
  }
  */

  remember = true;

  errorMessage: string = null;
  successMessage = "Please check your email for password reset"
  verifymsg = "Your password has been reset. Please Login"
  showPassMsg = false;

  showVerifiedMsg = false;

  isLoading$: Observable<boolean>;
  private unsubscribe: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService, public orderReportService: OrderReportService, private UserServiced: UserService,
      private cookies : CookieService) {
    this.isLoading$ = this.authenticationService.isLoading$;
  }

  isSession=false;
  msg;

  ngOnInit(): void {
    this.authenticationService.logout()
  
    
    if(this.cookies.get("sessionExp") == "yes")
    {
      this.msg = "Session Expired"
      this.isSession = true;
    }
    else
    {
      this.isSession = false;
    }
    


    if(this.UserServiced.passwordCheck == 1)
    {
      this.showPassMsg = true;
    }

    if(this.UserServiced.isVerified == 1)
    {
      this.showVerifiedMsg = true;
    }


   // console.log(this.cookies.getAll())

   // this.user.email = this.cookies.get('email')
   // this.user.password = this.cookies.get('password')
   // console.log(this.remember)

    if(this.cookies.get('rememberMe') == 'true')
    {
      this.user.email = this.cookies.get('email')
      this.user.password = this.cookies.get('password')
    }

    this.cookies.delete("sessionExp")

  }

  getStatus()
  {
    console.log(this.remember)
  }

  handleLogin() {
    let that = this;
    if (this.validateForm()) return;


    if(this.remember == true)
    {
      //console.log("hi")
      this.cookies.set('rememberMe', 'true')
      this.cookies.set('email', this.user.email );
      this.cookies.set('password', this.user.password)
    }
    else if(this.remember == false)
    {
      this.cookies.set('rememberMe', 'false')
      this.cookies.delete('email', this.user.email );
      this.cookies.delete('password', this.user.password)
    }


    
    this.cookies.set('userEmail', this.user.email)
    this.cookies.set('userPassword', this.user.password)

    const loginSubscr = this.authenticationService
      .login(this.user, this.UserServiced)
      .pipe(first())
      .subscribe((res: any) => {
        if (res && res.result) {
          localStorage.setItem(that.authenticationService.userEmailKey, that.user.email);
          this.UserServiced.userEmail = that.user.email
        }
        else {
          this.errorMessage = res.message;
          console.log(this.errorMessage)
          console.log(res)
          if (this.errorMessage == 'User Token Generation Failed, Invalid Email and Password.') {
            this.errorMessage = "Invalid Email or Password!"
          }
          else if (this.errorMessage == 'Something is Wrong!!!') {
            this.errorMessage = "Invalid Email or Password!"
          }
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  // handleLogin() {
  //   if (this.validateForm()) return;
  //   this.UserService.login(this.user)
  //     .then((result) => { })
  //     .catch((err) => {
  //       this.errorMessage = err.message;
  //     });
  // }

  forgetPassPage()
  {
    this.router.navigate(['/forgetPassword'])
  }

  validateForm() {
    this.errorMessage = null;
    const { email, password } = this.user;

    this.user.errors = {};

    const regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = regEx.test(email);

    if (!email) {
      this.user.errors.email = true;
      this.errorMessage = 'Please provide your Email Address';
    } else if (!validEmail) {
      this.user.errors.email = true;
      this.errorMessage = 'Please provide a valid Email Address';
    } else if (!password) {
      this.user.errors.password = true;
      this.errorMessage = 'Please provide your Password';
    }
    return this.errorMessage && this.errorMessage.length;
  }

  ngOnDestroy() {
    if (this.unsubscribe && this.unsubscribe.length > 0)
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
