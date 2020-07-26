import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from '../shared/shared/shared.module';
import { FormulariosComponent } from '../../components/usuarios/formularios/formularios.component';



@NgModule({
  declarations: [
    FormulariosComponent,
  ],
  imports: [CommonModule, UsuariosRoutingModule, SharedModule,]
})
export class UsuariosModule {}
