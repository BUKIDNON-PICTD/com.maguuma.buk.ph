import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntityindividualPage } from './entityindividual.page';

describe('EntityindividualPage', () => {
  let component: EntityindividualPage;
  let fixture: ComponentFixture<EntityindividualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityindividualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntityindividualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
