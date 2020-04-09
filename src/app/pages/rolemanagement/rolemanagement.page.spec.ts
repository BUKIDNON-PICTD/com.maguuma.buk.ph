import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RolemanagementPage } from './rolemanagement.page';

describe('RolemanagementPage', () => {
  let component: RolemanagementPage;
  let fixture: ComponentFixture<RolemanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolemanagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RolemanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
