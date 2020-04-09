import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsermanagementPage } from './usermanagement.page';

describe('UsermanagementPage', () => {
  let component: UsermanagementPage;
  let fixture: ComponentFixture<UsermanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermanagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsermanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
