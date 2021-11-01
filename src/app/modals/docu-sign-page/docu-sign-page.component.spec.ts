import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocuSignPageComponent } from './docu-sign-page.component';

describe('DocuSignPageComponent', () => {
  let component: DocuSignPageComponent;
  let fixture: ComponentFixture<DocuSignPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocuSignPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocuSignPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
