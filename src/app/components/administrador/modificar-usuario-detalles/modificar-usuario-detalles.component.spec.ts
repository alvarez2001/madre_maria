import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUsuarioDetallesComponent } from './modificar-usuario-detalles.component';

describe('ModificarUsuarioDetallesComponent', () => {
  let component: ModificarUsuarioDetallesComponent;
  let fixture: ComponentFixture<ModificarUsuarioDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarUsuarioDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUsuarioDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
