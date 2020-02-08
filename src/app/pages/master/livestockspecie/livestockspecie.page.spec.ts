import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivestockspeciePage } from './livestockspecie.page';

describe('LivestockspeciePage', () => {
  let component: LivestockspeciePage;
  let fixture: ComponentFixture<LivestockspeciePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestockspeciePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivestockspeciePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
