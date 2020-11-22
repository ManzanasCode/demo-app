import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaClientesPage } from './lista-clientes.page';

describe('ListaClientesPage', () => {
  let component: ListaClientesPage;
  let fixture: ComponentFixture<ListaClientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaClientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
