import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SyncpagePage } from './syncpage.page';

describe('SyncpagePage', () => {
  let component: SyncpagePage;
  let fixture: ComponentFixture<SyncpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SyncpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
