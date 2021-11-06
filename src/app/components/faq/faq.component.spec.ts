import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatFaqModule} from '@angular-material-extensions/faq';
import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFaqModule.forRoot()],
      declarations: [ FaqComponent ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(FaqComponent);
      component = fixture.componentInstance;
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
