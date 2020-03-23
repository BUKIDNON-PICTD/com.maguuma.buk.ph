import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmerassistancedetailPage } from './farmerassistancedetail.page';

describe('FarmerassistancedetailPage', () => {
  let component: FarmerassistancedetailPage;
  let fixture: ComponentFixture<FarmerassistancedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerassistancedetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerassistancedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
