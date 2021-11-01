import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalleadsComponent } from './legalleads.component';

describe('LegalleadsComponent', () => {
  let component: LegalleadsComponent;
  let fixture: ComponentFixture<LegalleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalleadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
