import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioAdminComponent } from 'src/app/components/administrador/inicio-admin/inicio-admin.component';
import { UsuariosAdminComponent } from 'src/app/components/administrador/usuarios-admin/usuarios-admin.component';
import { NominasVistaComponent } from 'src/app/components/administrador/nominas-vista/nominas-vista.component';

const routes: Routes = [
  {
    path:'',
    component:InicioAdminComponent,
    data:{pagina:'Inicio Administrador'}
  },
  {
    path:'usuarios',
    component:UsuariosAdminComponent,
    loadChildren:()=>import('src/app/modules/usuarios-admin/usuarios-admin.module').then( m => m.UsuariosAdminModule),
    data:{pagina:'Administrar estudiantes'}
  },
  {
    path:'nominas',
    loadChildren:()=>import('src/app/modules/nominas/nominas.module').then( m => m.NominasModule ),
    data: { pagina:'Nóminas' }
  },
  {
    path:'planillas',
    loadChildren:()=>import('src/app/modules/planillas/planillas.module').then( m => m.PlanillasModule ),
    data: { pagina : 'Planillas' }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
