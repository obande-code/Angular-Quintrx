import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ssa89Component } from './ssa89.component';

describe('Ssa89Component', () => {
  let component: Ssa89Component;
  let fixture: ComponentFixture<Ssa89Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ssa89Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ssa89Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
