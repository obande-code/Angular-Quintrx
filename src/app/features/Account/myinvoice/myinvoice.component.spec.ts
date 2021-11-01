import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinvoiceComponent } from './myinvoice.component';

describe('MyinvoiceComponent', () => {
  let component: MyinvoiceComponent;
  let fixture: ComponentFixture<MyinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
