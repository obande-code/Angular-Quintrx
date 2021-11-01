import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent implements OnInit, OnDestroy {
  pdfSrc: string = '../../assets/pdfs/Terms of Use.pdf';

  constructor(private modal: NgbActiveModal, private userService: UserService) {
    this.checkScroll = this.checkScroll.bind(this);
  }

  ngOnInit(): void {}

  close() {
    this.modal.close();
  }

  ngOnDestroy() {
    const container = document.querySelector('.ng2-pdf-viewer-container');
    if (container) {
      container.removeEventListener('scroll', this.checkScroll);
    }
  }

  pdfLoaded(event) {
    document.querySelector('.ng2-pdf-viewer-container').addEventListener('scroll', this.checkScroll);
  }

  checkScroll(e) {
    if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50) {
      this.userService.termsOfUseChecked$.next(true);
    }
  }
}
