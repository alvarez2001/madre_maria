import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataEstudianteComponent } from 'src/app/components/usuarios/data-estudiante/data-estudiante.component';
import { DatosHermanasComponent } from 'src/app/components/usuarios/datos-hermanas/datos-hermanas.component';
import { DatosPadreComponent } from 'src/app/components/usuarios/datos-padre/datos-padre.component';
import { DatosMadreComponent } from 'src/app/components/usuarios/datos-madre/datos-madre.component';
import { InicioInscripComponent } from 'src/app/components/usuarios/inicio-inscrip/inicio-inscrip.component';
import { DireccionesComponent } from 'src/app/components/usuarios/direcciones/direcciones.component';
import { PlantelesComponent } from 'src/app/components/usuarios/planteles/planteles.component';
import { BalancesComponent } from 'src/app/components/usuarios/balances/balances.component';

import { PreescolarStep1Component } from "src/app/components/usuarios/preescolar-step1/preescolar-step1.component";

import { PreescolarStep2Component } from "src/app/components/usuarios/preescolar-step2/preescolar-step2.component";
import { PasosGuard } from 'src/app/guards/pasos.guard';


const routes: Routes = [
  {
    path:'',
    component:InicioInscripComponent,

  },
  {
    path:'datos-estudiante',
    component:DataEstudianteComponent,
    canActivate:[PasosGuard],
    data:{pasoCurrent:1}
  },
  {
    path:'datos-padre',
    component:DatosPadreComponent,
    canActivate:[PasosGuard],
    data:{pasoCurrent:2}
  },
  {
    path:'datos-madre',
    component:DatosMadreComponent,
    canActivate:[PasosGuard],
    data:{pasoCurrent:3}
  },
  {
    path:'hermanas-plantel',
    component:DatosHermanasComponent,
    canActivate:[PasosGuard],
    data:{pasoCurrent:4}
  },
  {
    path:'direcciones-estudiante',
    component:DireccionesComponent,
    canActivate:[PasosGuard],
    data:{pasoCurrent:5}
  },
  {
    path:'planteles',
    component:PlantelesComponent,
    canActivate:[PasosGuard],
    data:{pasoCurrent:6}
  },
  {
    path:'balances',
    component:BalancesComponent,
    canActivate:[PasosGuard],
    data:{pasoCurrent:7}
  },
  {
    path:'distribucion',
    component:PreescolarStep1Component,
    canActivate:[PasosGuard],
    data:{pasoCurrent:8}
  },
  {
    path:'antecedentes',
    component:PreescolarStep2Component,
    canActivate:[PasosGuard],
    data:{pasoCurrent:9}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioRoutingModule { }
