import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmlocationlivestockPage } from './farmlocationlivestock.page';

describe('FarmlocationlivestockPage', () => {
  let component: FarmlocationlivestockPage;
  let fixture: ComponentFixture<FarmlocationlivestockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmlocationlivestockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmlocationlivestockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
