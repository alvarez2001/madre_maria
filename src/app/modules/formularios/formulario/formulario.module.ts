import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared/shared.module';
import { DataEstudianteComponent } from '../../../components/usuarios/data-estudiante/data-estudiante.component';
import { InfoFormularioComponent } from '../../../components/usuarios/info-formulario/info-formulario.component';
import { DatosHermanasComponent } from '../../../components/usuarios/datos-hermanas/datos-hermanas.component';
import { DatosPadreComponent } from '../../../components/usuarios/datos-padre/datos-padre.component';
import { DatosMadreComponent } from '../../../components/usuarios/datos-madre/datos-madre.component';


@NgModule({
  declarations: [DataEstudianteComponent, InfoFormularioComponent, DatosHermanasComponent, DatosPadreComponent, DatosMadreComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormularioRoutingModule
  ]
})
export class FormularioModule { }
