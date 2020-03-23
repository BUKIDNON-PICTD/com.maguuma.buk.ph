import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OlmapComponent } from './olmap.component';

describe('OlmapComponent', () => {
  let component: OlmapComponent;
  let fixture: ComponentFixture<OlmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlmapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OlmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
