import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryofconsumerrightsComponent } from './summaryofconsumerrights.component';

describe('SummaryofconsumerrightsComponent', () => {
  let component: SummaryofconsumerrightsComponent;
  let fixture: ComponentFixture<SummaryofconsumerrightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryofconsumerrightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryofconsumerrightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
