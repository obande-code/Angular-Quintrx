import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyouSubComponent } from './thankyou.component';

describe('ThankyouComponent', () => {
  let component: ThankyouSubComponent;
  let fixture: ComponentFixture<ThankyouSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankyouSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankyouSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
