import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmlocationcommodityPage } from './farmlocationcommodity.page';

describe('FarmlocationcommodityPage', () => {
  let component: FarmlocationcommodityPage;
  let fixture: ComponentFixture<FarmlocationcommodityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmlocationcommodityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmlocationcommodityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
