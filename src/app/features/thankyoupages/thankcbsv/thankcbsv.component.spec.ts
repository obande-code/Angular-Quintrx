import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankcbsvComponent } from './thankcbsv.component';

describe('ThankcbsvComponent', () => {
  let component: ThankcbsvComponent;
  let fixture: ComponentFixture<ThankcbsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankcbsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankcbsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
