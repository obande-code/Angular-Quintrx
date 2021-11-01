import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'src/app/Configs/Config';
import { DocuSignPageComponent } from 'src/app/modals/docu-sign-page/docu-sign-page.component';
import { UserService } from 'src/app/APIs/user/user.service';


@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  constructor(private modal : NgbModal, private UserService : UserService, private _route : Router) { }
  url = "https://demo.docusign.net/Signing/?insession=1&ti=a7c3ae45ad854ba9aa8e6530cef9293f"
  isDisabled = true;
  
  loadFinish(e)
  {
    
  }

   /*
  openDocu()
  {

    document.getElementById("sign-CBSV").style.display="";
    
     //window.open("https://demo.docusign.net/", "_blank");
    // this.modal.open("https://demo.docusign.net/Signing/?insession=1&ti=e9bc5927325b49949c04209801eb8e54" , 
     //{
     //  size : 'xl'
     //});
    
  }
  */

  openDocu() {
    this.modal.open(DocuSignPageComponent, {
      size: 'xl',
     
      
    });

    this.isDisabled = this.UserService.isSigned;
    console.log(this.isDisabled)
   
  }
/*
  vali()
  {
    let validation = new config()
    
    //var x = '02-29-2024';

    //var x2 = validation.validateDate(x);

    //alert(x2)

    var x = '708-830-9829'

    var x2 = validation.validatePhone(x);

    alert(x2)


  }
  */
/*
  vali1()
  {
    let validation = new config()
    
    var x = '846-45-6789';

    var x2 = validation.validateSSN(x);

    alert(x2)


  }
  */

  openTermsModal() {
    this.modal.open("https://demo.docusign.net/Signing/?insession=1&ti=a7c3ae45ad854ba9aa8e6530cef9293f"), {
      size: 'xl',
    };
   
  }

  signed()
  {
    if(this.isDisabled == false)
    {
      this.UserService.updateDocuStatus()
      .then((result) => {
  
  
      })
      .catch((err) => {
        console.log(err);
      
      });
  
    }else
    {
      this.isDisabled = true;
    }

    this._route.navigate(['/acceptancemsg']);
  }

  ngOnInit(): void {
  }

}
