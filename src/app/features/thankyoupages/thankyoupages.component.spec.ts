import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyoupagesComponent } from './thankyoupages.component';

describe('ThankyoupagesComponent', () => {
  let component: ThankyoupagesComponent;
  let fixture: ComponentFixture<ThankyoupagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankyoupagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankyoupagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
