import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommodityPage } from './commodity.page';

describe('CommodityPage', () => {
  let component: CommodityPage;
  let fixture: ComponentFixture<CommodityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
