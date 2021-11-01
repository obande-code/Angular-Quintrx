import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.scss']
})
export class UserGuideComponent implements OnInit {
  pdfSrc: string = '../../assets/pdfs/Quintrx Client Sign In Flow.pdf';

  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close() {
    this.modal.close();
  }

}
