import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommodityvarietyPage } from './commodityvariety.page';

describe('CommodityvarietyPage', () => {
  let component: CommodityvarietyPage;
  let fixture: ComponentFixture<CommodityvarietyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityvarietyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityvarietyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
