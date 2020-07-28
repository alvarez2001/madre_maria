import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInhabilitadoComponent } from './modal-inhabilitado.component';

describe('ModalInhabilitadoComponent', () => {
  let component: ModalInhabilitadoComponent;
  let fixture: ComponentFixture<ModalInhabilitadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInhabilitadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInhabilitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
