import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoriformComponent } from './coriform.component';

describe('CoriformComponent', () => {
  let component: CoriformComponent;
  let fixture: ComponentFixture<CoriformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoriformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoriformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
