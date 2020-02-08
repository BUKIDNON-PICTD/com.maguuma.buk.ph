import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommoditytypePage } from './commoditytype.page';

describe('CommoditytypePage', () => {
  let component: CommoditytypePage;
  let fixture: ComponentFixture<CommoditytypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommoditytypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommoditytypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
