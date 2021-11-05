import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugscreeningComponent } from './drugscreening.component';

describe('DrugscreeningComponent', () => {
  let component: DrugscreeningComponent;
  let fixture: ComponentFixture<DrugscreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugscreeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugscreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
