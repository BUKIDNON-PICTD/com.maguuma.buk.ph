import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CapturefarmerPage } from './capturefarmer.page';

describe('CapturefarmerPage', () => {
  let component: CapturefarmerPage;
  let fixture: ComponentFixture<CapturefarmerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturefarmerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CapturefarmerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
