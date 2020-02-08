import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivestockbreedPage } from './livestockbreed.page';

describe('LivestockbreedPage', () => {
  let component: LivestockbreedPage;
  let fixture: ComponentFixture<LivestockbreedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestockbreedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivestockbreedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
