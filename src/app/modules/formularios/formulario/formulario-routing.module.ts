import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataEstudianteComponent } from 'src/app/components/usuarios/data-estudiante/data-estudiante.component';
import { InfoFormularioComponent } from 'src/app/components/usuarios/info-formulario/info-formulario.component';
import { DatosHermanasComponent } from 'src/app/components/usuarios/datos-hermanas/datos-hermanas.component';
import { DatosPadreComponent } from 'src/app/components/usuarios/datos-padre/datos-padre.component';
import { DatosMadreComponent } from 'src/app/components/usuarios/datos-madre/datos-madre.component';
import { InicioInscripComponent } from 'src/app/components/usuarios/inicio-inscrip/inicio-inscrip.component';
import { DireccionesComponent } from 'src/app/components/usuarios/direcciones/direcciones.component';

const routes: Routes = [
  {
    path:'',
    component:InicioInscripComponent
  },
  {
    path:'datos-estudiante',
    component:DataEstudianteComponent
  },
  {
    path:'hermanas-plantel',
    component:DatosHermanasComponent
  },
  {
    path:'datos-padre',
    component:DatosPadreComponent
  },
  {
    path:'datos-madre',
    component:DatosMadreComponent
  },
  {
    path:'direcciones-estudiante',
    component:DireccionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioRoutingModule { }
