import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapapuntosPage } from './mapapuntos.page';

describe('MapapuntosPage', () => {
  let component: MapapuntosPage;
  let fixture: ComponentFixture<MapapuntosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapapuntosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapapuntosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
