import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComodityareacrosstabPage } from './comodityareacrosstab.page';

describe('ComodityareacrosstabPage', () => {
  let component: ComodityareacrosstabPage;
  let fixture: ComponentFixture<ComodityareacrosstabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComodityareacrosstabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComodityareacrosstabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
