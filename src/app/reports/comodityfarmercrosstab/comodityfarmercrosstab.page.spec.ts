import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComodityfarmercrosstabPage } from './comodityfarmercrosstab.page';

describe('ComodityfarmercrosstabPage', () => {
  let component: ComodityfarmercrosstabPage;
  let fixture: ComponentFixture<ComodityfarmercrosstabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComodityfarmercrosstabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComodityfarmercrosstabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
