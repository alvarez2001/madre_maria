import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from 'src/app/components/administrador/inicio/inicio.component';


const routes: Routes = [
  {
    path:'',
    component:InicioComponent,
    loadChildren:()=>import('src/app/modules/admin/admin.module').then( m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
