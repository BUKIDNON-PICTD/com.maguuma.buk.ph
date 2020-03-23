import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarminventorylistPage } from './farminventorylist.page';

describe('FarminventorylistPage', () => {
  let component: FarminventorylistPage;
  let fixture: ComponentFixture<FarminventorylistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarminventorylistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarminventorylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
