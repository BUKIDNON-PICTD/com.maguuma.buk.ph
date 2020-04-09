import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportlistPage } from './reportlist.page';

describe('ReportlistPage', () => {
  let component: ReportlistPage;
  let fixture: ComponentFixture<ReportlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
