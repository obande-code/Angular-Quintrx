import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptancemsgComponent } from './acceptancemsg.component';

describe('AcceptancemsgComponent', () => {
  let component: AcceptancemsgComponent;
  let fixture: ComponentFixture<AcceptancemsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptancemsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptancemsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
