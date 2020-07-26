import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared/shared.module';
import { DataEstudianteComponent } from '../../../components/usuarios/data-estudiante/data-estudiante.component';
import { InfoFormularioComponent } from '../../../components/usuarios/info-formulario/info-formulario.component';
import { DatosHermanasComponent } from '../../../components/usuarios/datos-hermanas/datos-hermanas.component';
import { DatosPadreComponent } from '../../../components/usuarios/datos-padre/datos-padre.component';
import { DatosMadreComponent } from '../../../components/usuarios/datos-madre/datos-madre.component';
import {RoundProgressModule, ROUND_PROGRESS_DEFAULTS} from 'angular-svg-round-progressbar';
import { InicioInscripComponent } from 'src/app/components/usuarios/inicio-inscrip/inicio-inscrip.component';

import { MaterialModule } from 'src/app/modules/shared/material/material.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DireccionesComponent } from '../../../components/usuarios/direcciones/direcciones.component';
import { BalancesComponent } from 'src/app/components/usuarios/balances/balances.component';
import { TextosRepetidoComponent } from "src/app/components/usuarios/textos-repetido/textos-repetido.component";
import { PlantelesComponent } from 'src/app/components/usuarios/planteles/planteles.component';
import { PreescolarStep1Component } from '../../../components/usuarios/preescolar-step1/preescolar-step1.component';
import { PreescolarStep2Component } from '../../../components/usuarios/preescolar-step2/preescolar-step2.component';
import { ModalPagosReferenciaComponent } from '../../../components/usuarios/modal-pagos-referencia/modal-pagos-referencia.component';

@NgModule({
  declarations: [DataEstudianteComponent, InfoFormularioComponent, DatosHermanasComponent, DatosPadreComponent, DatosMadreComponent, InicioInscripComponent, DireccionesComponent, BalancesComponent,TextosRepetidoComponent,PlantelesComponent, PreescolarStep1Component, PreescolarStep2Component, ModalPagosReferenciaComponent],
  imports: [
    CommonModule,
    NgCircleProgressModule.forRoot({}),
    SharedModule,
    FormularioRoutingModule,
    MaterialModule
  ],
  providers:[
    {
      provide: ROUND_PROGRESS_DEFAULTS,
      useValue: {
        color: '#f00',
        background: '#0f0'
      }
    }
  ]
})
export class FormularioModule { }
