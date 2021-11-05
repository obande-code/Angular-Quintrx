import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployementverifyComponent } from './employementverify.component';

describe('EmployementverifyComponent', () => {
  let component: EmployementverifyComponent;
  let fixture: ComponentFixture<EmployementverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployementverifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployementverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
