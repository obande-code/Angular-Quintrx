import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouSubComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    localStorage.removeItem("consentDatainfo")
  }

}
