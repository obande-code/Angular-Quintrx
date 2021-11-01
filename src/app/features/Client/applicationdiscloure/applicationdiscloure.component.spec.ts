import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationdiscloureComponent } from './applicationdiscloure.component';

describe('ApplicationdiscloureComponent', () => {
  let component: ApplicationdiscloureComponent;
  let fixture: ComponentFixture<ApplicationdiscloureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationdiscloureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationdiscloureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
