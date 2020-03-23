import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyperiodPage } from './surveyperiod.page';

describe('SurveyperiodPage', () => {
  let component: SurveyperiodPage;
  let fixture: ComponentFixture<SurveyperiodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyperiodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyperiodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
