import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmenugroupactionComponent } from './addmenugroupaction.component';

describe('AddmenugroupactionComponent', () => {
  let component: AddmenugroupactionComponent;
  let fixture: ComponentFixture<AddmenugroupactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmenugroupactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmenugroupactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
