import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoporteTecnicoRoutingModule } from './soporte-tecnico-routing.module';
import { SoporteComponent } from '../../components/soporte/soporte.component';
import { SharedModule } from '../shared/shared/shared.module';
import { ModalInhabilitadoComponent } from 'src/app/components/modal-inhabilitado/modal-inhabilitado.component';


@NgModule({
  declarations: [SoporteComponent],
  imports: [
    CommonModule,
    SharedModule,
    SoporteTecnicoRoutingModule
  ]
})
export class SoporteTecnicoModule { }
