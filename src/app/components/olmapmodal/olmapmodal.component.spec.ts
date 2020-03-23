import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OlmapmodalComponent } from './olmapmodal.component';

describe('OlmapmodalComponent', () => {
  let component: OlmapmodalComponent;
  let fixture: ComponentFixture<OlmapmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlmapmodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OlmapmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
