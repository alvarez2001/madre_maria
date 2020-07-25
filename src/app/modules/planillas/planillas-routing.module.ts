import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanillasVistaComponent } from 'src/app/components/administrador/planillas-vista/planillas-vista.component';

const routes: Routes = [
  {
    path:'',
    component:PlanillasVistaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanillasRoutingModule { }
