import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddmenuComponent } from './admin-addmenu.component';

describe('AdminAddmenuComponent', () => {
  let component: AdminAddmenuComponent;
  let fixture: ComponentFixture<AdminAddmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
