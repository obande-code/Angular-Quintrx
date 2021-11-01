import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-docu-sign-page',
  templateUrl: './docu-sign-page.component.html',
  styleUrls: ['./docu-sign-page.component.scss']
})
export class DocuSignPageComponent implements OnInit {

 // docUrl = "https://demo.docusign.net/Signing/?insession=1&ti=2ffa8e89b5524f099bcd7254fc160138";
  docUrl = "hello";
  

  constructor(private modal: NgbActiveModal, private UserService : UserService) {}

  close() {

   
    
    this.modal.close();
  }


  
  ngOnInit(): void {
   // (<HTMLInputElement>document.getElementById("sign-CBSV")).src = "https://demo.docusign.net/Signing/MTRedeem/v1/ec73dd75-8821-454e-9596-49cb1d4f44b4?slt=eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQYAAAABAAMABwCAoA2gNVHZSAgAgEAfJ1dR2UgYAAEAAAAAAAAAIQCBAgAAeyJUb2tlbklkIjoiYzMyZjkwZDAtOGYyMy00MzZhLWFlNTctN2Q1MDgxZGRkZjAxIiwiRXhwaXJhdGlvbiI6IjIwMjEtMDctMjdUMTk6NDA6MDErMDA6MDAiLCJJc3N1ZWRBdCI6IjIwMjEtMDctMjdUMTk6MzU6MDEuMzYyOTg1KzAwOjAwIiwiUmVzb3VyY2VJZCI6ImNjOGNiYjYyLTA5YmQtNGJmMC04NWI4LTBmMTEzNGQ1YmU1YyIsIlJlc291cmNlcyI6IntcIkVudmVsb3BlSWRcIjpcImNjOGNiYjYyLTA5YmQtNGJmMC04NWI4LTBmMTEzNGQ1YmU1Y1wiLFwiQWN0b3JVc2VySWRcIjpcIjhhZjRjYzhhLTJlOWQtNGRmNi1iZWY3LWM1NjVkNzVkZGJhMVwiLFwiUmVjaXBpZW50SWRcIjpcIjlkNWE4ZDNiLTZmNTktNGIxZC1iYWIzLTQyNGQ2YWRmYTE2ZVwiLFwiRmFrZVF1ZXJ5U3RyaW5nXCI6XCJ0PTgwYzBiNDNmLTgxZmYtNGNhZS05NWNkLWM1N2UyNDZjMDkwMFwifSIsIlRva2VuVHlwZSI6MSwiQXVkaWVuY2UiOiIyNWUwOTM5OC0wMzQ0LTQ5MGMtOGU1My0zYWIyY2E1NjI3YmYiLCJSZWRpcmVjdFVyaSI6Imh0dHBzOi8vZGVtby5kb2N1c2lnbi5uZXQvU2lnbmluZy9TdGFydEluU2Vzc2lvbi5hc3B4IiwiSGFzaEFsZ29yaXRobSI6MCwiSGFzaFJvdW5kcyI6MCwiVG9rZW5TdGF0dXMiOjAsIklzU2luZ2xlVXNlIjpmYWxzZX0_AABoRVI2UdlI.lE_rqnHACufiSaTephzPdxfbe3kHC3NySWoslRuQRhECMtPjaIhbH5UFINWXFI4KsEMzzfddWMaB97V9ceDDc-mxUr6_sDHIPhL0y2Yy3BHjjamW6oprW3PwPw2rCsXFBPjINMUEJUYxR18xPayeu4llR1_c7uFzb2zyFHzuXxVVg1IIVfbA5sNLa0uz-0LIOVgw_KwZsTAo-fOZVQ-auXKKbUN1SuDPVhyvRgrZaQRMQ86j0LlVSt84pBeZdA67v6SjwVJrxX9EUOuxWv70BCy4pEAi2cCPKBGiDXS4l7AJ_gWk8jYT8blyAsTHuN6Y9rTjk9iyDH7U3sxh0zp-7A";

     
    this.UserService.getDocuSign().subscribe(data =>
      {
        let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];
        
        (<HTMLInputElement>document.getElementById("sign-CBSV")).src = getCountArray
        //this.UserService.isSigned = false;
        console.log(this.UserService.isSigned)
        console.log(getCountArray)
      })
    

    
  }


}
