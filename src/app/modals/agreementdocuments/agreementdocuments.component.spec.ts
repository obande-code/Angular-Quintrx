import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementdocumentsComponent } from './agreementdocuments.component';

describe('AgreementdocumentsComponent', () => {
  let component: AgreementdocumentsComponent;
  let fixture: ComponentFixture<AgreementdocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementdocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
