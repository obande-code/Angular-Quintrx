import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentdocsComponent } from './consentdocs.component';

describe('ConsentdocsComponent', () => {
  let component: ConsentdocsComponent;
  let fixture: ComponentFixture<ConsentdocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentdocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentdocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
