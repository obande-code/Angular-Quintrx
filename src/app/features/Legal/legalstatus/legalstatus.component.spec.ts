import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalstatusComponent } from './legalstatus.component';

describe('LegalstatusComponent', () => {
  let component: LegalstatusComponent;
  let fixture: ComponentFixture<LegalstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
