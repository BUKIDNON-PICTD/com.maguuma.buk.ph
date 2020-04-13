import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmerlistlivestockPage } from './farmerlistlivestock.page';

describe('FarmerlistlivestockPage', () => {
  let component: FarmerlistlivestockPage;
  let fixture: ComponentFixture<FarmerlistlivestockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerlistlivestockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerlistlivestockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
