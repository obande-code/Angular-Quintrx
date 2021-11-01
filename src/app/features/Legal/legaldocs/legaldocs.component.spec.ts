import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegaldocsComponent } from './legaldocs.component';

describe('LegaldocsComponent', () => {
  let component: LegaldocsComponent;
  let fixture: ComponentFixture<LegaldocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegaldocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegaldocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
