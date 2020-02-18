import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmlocationdetailPage } from './farmlocationdetail.page';

describe('FarmlocationdetailPage', () => {
  let component: FarmlocationdetailPage;
  let fixture: ComponentFixture<FarmlocationdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmlocationdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmlocationdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
