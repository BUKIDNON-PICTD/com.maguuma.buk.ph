import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmfacilitydetailPage } from './farmfacilitydetail.page';

describe('FarmfacilitydetailPage', () => {
  let component: FarmfacilitydetailPage;
  let fixture: ComponentFixture<FarmfacilitydetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmfacilitydetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmfacilitydetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
