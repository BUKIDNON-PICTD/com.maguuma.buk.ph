import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CachemapComponent } from './cachemap.component';

describe('CachemapComponent', () => {
  let component: CachemapComponent;
  let fixture: ComponentFixture<CachemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CachemapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CachemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
