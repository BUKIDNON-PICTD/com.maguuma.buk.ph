import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmerlistcrosstabPage } from './farmerlistcrosstab.page';

describe('FarmerlistcrosstabPage', () => {
  let component: FarmerlistcrosstabPage;
  let fixture: ComponentFixture<FarmerlistcrosstabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerlistcrosstabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerlistcrosstabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
