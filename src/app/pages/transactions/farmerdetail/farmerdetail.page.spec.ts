import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmerdetailPage } from './farmerdetail.page';

describe('FarmerdetailPage', () => {
  let component: FarmerdetailPage;
  let fixture: ComponentFixture<FarmerdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
