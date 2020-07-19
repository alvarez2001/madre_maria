import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CedulaDirective } from 'src/app/directivas/validacionesAsincronas/cedula.directive';

@NgModule({
  declarations: [CedulaDirective],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule,

  ],exports:[ReactiveFormsModule, FormsModule, CedulaDirective]
})
export class SharedModule { }
