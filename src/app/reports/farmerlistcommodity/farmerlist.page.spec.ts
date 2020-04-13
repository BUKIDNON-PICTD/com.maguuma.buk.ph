import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmerlistPage } from './farmerlist.page';

describe('FarmerlistPage', () => {
  let component: FarmerlistPage;
  let fixture: ComponentFixture<FarmerlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
