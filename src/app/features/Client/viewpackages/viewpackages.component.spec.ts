import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPackagesComponent } from './viewpackages.component';

describe('viewpackagesComponent', () => {
  let component: ViewPackagesComponent;
  let fixture: ComponentFixture<ViewPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
