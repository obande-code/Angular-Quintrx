import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../../../APIs/user/user.service';

import { TermsOfUseComponent } from '../../../modals/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from 'src/app/modals/privacy-policy/privacy-policy.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLoading$ = false

  user: any = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    policy: false,
    errors: {},
    ip_address: '40.128.239.162'
  };

  http: HttpClient

  ipAddress;

  getIP(){


    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      // console.log('th data', data);
       this.ipAddress = data.ip
       return this.ipAddress

      })

  }


  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  userNotFound  = "Looks like you're a new user. Please sign up"
  userNotFoundCheck = false;

  errorMessage: string = null;
  isTermsSeen: boolean = false;
  isPolicySeen: boolean = false;

  constructor(private UserService: UserService, private modal: NgbModal) {}

  ngOnInit(): void {
    if(this.UserService.passwordCheck == 2)
    {
      this.userNotFoundCheck = true;
    }

    this.UserService.termsOfUseChecked$.subscribe(checked => {
      this.isTermsSeen = checked;
    });

    this.UserService.privacyPolicyChecked$.subscribe(checked => {
      this.isPolicySeen = checked;
    });
  }

  register() {
    if (this.validateForm())return;
    this.isLoading$ = true
    this.UserService.register(this.user)

      .then((result) => {})

      .catch((err) => {
        console.log(err);

        this.isLoading$ = false;

        this.errorMessage = err.message;
      })
  }



  openTermsModal() {
    this.modal.open(TermsOfUseComponent, {
      size: 'xl',
    });

    //this.isTermsSeen = true;
  }

  openPrivacyModal() {
    this.modal.open(PrivacyPolicyComponent, {
      size: 'xl',
    });
    //this.isPolicySeen = true;
  }

  validateForm() {
    this.errorMessage = null;
    const { firstname, lastname, email, password, confirmPassword, policy, } =
      this.user;

    this.user.errors = {};

    var regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validEmail = regEx.test(email);

    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var re = /[a-z]/;

    if (!firstname) {
      this.user.errors.firstname = true;
      this.errorMessage = 'Please enter your First Name';
    } else if (!lastname) {
      this.user.errors.lastname = true;
      this.errorMessage = 'Please enter your Last Name';
    } else if (!email) {
      this.user.errors.email = true;
      this.errorMessage = 'Please provide your Email Address';
    } else if (!validEmail) {
      this.user.errors.email = true;
      this.errorMessage = 'Please provide a valid Email Address';
    } else if (!password || password.length < 5) {
      this.user.errors.password = true;
      this.errorMessage =
        'Please provide your Password of at least 5 characters';
    } else if (password.search(/[A-Z]/) == -1) {
      this.user.errors.password = true;
      this.errorMessage = 'Your password needs an upper case letter';
    } else if (!re.test(password)) {
      this.user.errors.password = true;
      this.errorMessage = 'Your password needs a lower case letter';
    } else if (!regularExpression.test(password)) {
      this.user.errors.password = true;
      this.errorMessage =
        'Password should contain atleast one number and one special character';
    } else if (password != confirmPassword) {
      this.user.errors.password = true;
      this.user.errors.confirmPassword = true;
      this.errorMessage = "Passwords don't match! Please try again";
    } else if (!policy) {
      this.user.errors.policy = true;
      this.errorMessage = 'Please accept Terms of Use and Privacy Policy.';
    }

    return this.errorMessage && this.errorMessage.length;
  }
}
