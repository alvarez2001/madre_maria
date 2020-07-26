import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroEstudianteComponent } from 'src/app/components/usuarios/registro-estudiante/registro-estudiante.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroEstudianteComponent,
    data: { pagina: 'Registro estudiante' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroUsuarioRoutingModule { }
