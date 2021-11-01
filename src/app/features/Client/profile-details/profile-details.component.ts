import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  successMessage = "User Details Updated"
  errorMessage = "User Details Failed to Update"
  showSucMsg = false
  showErrorMsg = false

  public loading: boolean;

  userDetailsComp : any = {
    userDetailId : null,
    clientType : null,
    companyRegisteredName : null,
    employerIdentificationNumber : null,
    contactPersonFirstname : null,
    contactPersonLastname : null,
    contactPersonEmail : null,
    contactPersonPhone : null,
    address : null,
    aptSuite : null,
    city : null,
    state : null,
    zipcode : null,
    country : null
  }

  userDetailsInd : any = {
    userId : null,
    userDetailId : null,
    clientType : null,
    firstname : null,
    lastname : null,
    email : null,
    phone : null,
    address : null,
    aptSuite : null,
    city : null,
    state : null,
    zipcode : null,
    country : null
  }


  public profileDetails = [];


  constructor(private UserService: UserService, private auth: AuthenticationService) { }

  ngOnInit(): void {


    //this.updateUserDetails();
   // this.userId();

    var x  = this.auth.getAuthFromLocalStorage();
    console.log(x)

    var email = localStorage.getItem('USER_EMAIL');
    //console.log(localStorage.getItem('USER_EMAIL'))
    var getUserId;

    this.auth.getUserGroupRelationDetailByEmail(email).subscribe(x => {
      console.log(x["responseObject"]["userId"])



      getUserId = x["responseObject"]["userId"]

        console.log(getUserId)

        this.UserService.getUserDetails(getUserId).subscribe(data => {

          let toStringCount = JSON.stringify(data);
          const parseCount = JSON.parse(toStringCount);
          var getCountArray = parseCount["responseObject"];

          console.log(getCountArray)


          this.userDetailsComp.clientType = (getCountArray["clientType"])
          this.userDetailsInd.clientType = (getCountArray["clientType"])

          this.userDetailsComp.userDetailId = (getCountArray["userDetailId"])
          this.userDetailsInd.userDetailId = (getCountArray["userDetailId"])

          this.userDetailsComp.companyRegisteredName = (getCountArray["companyRegisteredName"])
            this.userDetailsComp.employerIdentificationNumber = (getCountArray["employerIdentificationNumber"])
            this.userDetailsComp.contactPersonFirstname = (getCountArray["contactPersonFirstname"])
            this.userDetailsComp.contactPersonLastname = (getCountArray["contactPersonLastname"])
            this.userDetailsComp.contactPersonEmail = (getCountArray["contactPersonEmail"])
            this.userDetailsComp.contactPersonPhone = (getCountArray["contactPersonPhone"])
            this.userDetailsComp.address = (getCountArray["address"])
            this.userDetailsComp.aptSuite = (getCountArray["aptSuite"])
            this.userDetailsComp.city = (getCountArray["city"])
            this.userDetailsComp.state = (getCountArray["state"])
            this.userDetailsComp.zipcode = (getCountArray["zipcode"])
            this.userDetailsComp.country = (getCountArray["country"])



          console.log(this.userDetailsComp)
          console.log(this.userDetailsInd)


        })

        this.UserService.findUser(getUserId).subscribe(data => {

          let toStringCount = JSON.stringify(data);
          const parseCount = JSON.parse(toStringCount);
          var getCountArray = parseCount["responseObject"];

          console.log(getCountArray)

            this.userDetailsInd.firstname = (getCountArray["firstname"])
            this.userDetailsInd.userId = (getCountArray["userId"])
            this.userDetailsInd.lastname = (getCountArray["lastname"])
            this.userDetailsInd.email = (getCountArray["email"])
            this.userDetailsInd.phone = (getCountArray["phone"])
            this.userDetailsInd.address = (getCountArray["address"])
            this.userDetailsInd.aptSuite = (getCountArray["aptSuite"])
            this.userDetailsInd.city = (getCountArray["city"])
            this.userDetailsInd.state = (getCountArray["state"])
            this.userDetailsInd.zipcode = (getCountArray["zipcode"])
            this.userDetailsInd.country = (getCountArray["country"])

            .catch((err) => {
              this.loading = false;
              console.log('HI')

              console.log(err);
              });


        })


    })


  }

  file : null;
  url: any;
  file1 : null;
  url2 : any;

  onFileChanged1(e)
  {
    this.file1 = e.target.files[0];
    var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_event) => {
			this.url2 = reader.result;
      console.log(this.url2);
		}
  }

  showIndi()
   {

     document.getElementById("consent-individualForm").style.display="";
     document.getElementById("consent-companyForm").style.display="none";


   }
   showComp()
   {

    document.getElementById("consent-individualForm").style.display="none";
    document.getElementById("consent-companyForm").style.display="";

   }

  updateUserDetails() {
    this.loading = true;
    //if (this.userDetailsComp.clientType == 1) {
      this.UserService.updateUserDetails(this.userDetailsComp)
        .then((result) => {
          this.loading = false;
          console.log(result)
          this.showSucMsg = true;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          });

    this.UserService.updateUser(this.userDetailsInd)
    .then((result) => {
      this.loading = false;
      console.log(result)
      this.showSucMsg = true;
    })
    .catch((err) => {
      this.loading = false;
      console.log(err);
      this.showErrorMsg = true
      });

    // else {
    //   this.UserService.updateUserDetails(this.userDetailsInd)
    //       .then((result) => {
    //         console.log(result)
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         });
    // }
  }

  updateUser() {
    this.loading = true;
    if (this.userDetailsComp.clientType == 1) {
      this.UserService.updateUser(this.userDetailsComp)
        .then((result) => {
          this.loading = false;
          console.log(result)
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          });
    }
    else {
      this.UserService.updateUserDetails(this.userDetailsInd)
          .then((result) => {
            console.log(result)
          })
          .catch((err) => {
            console.log(err);
            });
    }
    this.showSucMsg = true;
  }


  userId(){
    var userid = this.UserService.clientData["userid"];
    console.log("user id: "+userid)
  }



}
