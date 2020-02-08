import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CapturefarmPage } from './capturefarm.page';

describe('CapturefarmPage', () => {
  let component: CapturefarmPage;
  let fixture: ComponentFixture<CapturefarmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturefarmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CapturefarmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
