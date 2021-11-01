import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClientDocument } from './show-document-modal.component';

describe('ShowClientDocument', () => {
  let component: ShowClientDocument;
  let fixture: ComponentFixture<ShowClientDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowClientDocument ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowClientDocument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
