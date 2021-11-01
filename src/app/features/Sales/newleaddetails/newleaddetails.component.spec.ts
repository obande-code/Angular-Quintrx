import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewleaddetailsComponent } from './newleaddetails.component';

describe('NewleaddetailsComponent', () => {
  let component: NewleaddetailsComponent;
  let fixture: ComponentFixture<NewleaddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewleaddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewleaddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
