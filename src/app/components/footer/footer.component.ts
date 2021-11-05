import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { TermsOfUseComponent } from 'src/app/modals/terms-of-use/terms-of-use.component';
 import { UserGuideComponent } from 'src/app/modals/user-guide/user-guide.component';
 import {FaqItem} from 'ngx-material-faq';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  images: any = [
    "./assets/images/AR.png",
    "./assets/images/master-card.jpg",
    "./assets/images/Visa.png"
    //'https://bgcheck.vetzu.com/assets/images/AR.png',
    //'https://bgcheck.vetzu.com/assets/images/master-card.jpg',
    //'https://bgcheck.vetzu.com/assets/images/Visa.png',
  ];

  disableUserGuide = true
  email;
  list: FaqItem[] = [
    {
          question: 'Why does it think the jQuery plugin is missing?',
          answer: 'Remember: load jQuery before AngularJS if you are using jQuery plugins!'
        },
        {
          question: 'How do I access the DOM from a controller?',
          answer: 'DO NOT perform DOM selection/traversal from the controller. The HTML hasn\'t rendered yet. Look up \'directives\'.'
        }
  ];
  constructor(private modal: NgbModal, public router : Router) {}

  ngOnInit(): void {
    this.checkLogin()
  }

  openUserGuide(){
    this.modal.open(UserGuideComponent, {
      size: 'xl',
      });

  }

  checkLogin(){
    if (localStorage.getItem('USER_EMAIL')){
     // document.getElementById("userGuide").style.display="";
    }
  }





}


