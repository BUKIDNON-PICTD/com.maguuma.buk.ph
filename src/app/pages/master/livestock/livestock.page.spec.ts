import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivestockPage } from './livestock.page';

describe('LivestockPage', () => {
  let component: LivestockPage;
  let fixture: ComponentFixture<LivestockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivestockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
