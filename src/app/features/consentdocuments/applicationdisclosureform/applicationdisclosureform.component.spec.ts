import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationdisclosureformComponent } from './applicationdisclosureform.component';

describe('ApplicationdisclosureformComponent', () => {
  let component: ApplicationdisclosureformComponent;
  let fixture: ComponentFixture<ApplicationdisclosureformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationdisclosureformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationdisclosureformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
