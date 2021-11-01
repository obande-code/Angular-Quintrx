import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchreportComponent } from './searchreport.component';

describe('SearchreportComponent', () => {
  let component: SearchreportComponent;
  let fixture: ComponentFixture<SearchreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
