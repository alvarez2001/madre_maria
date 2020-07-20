import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  imports: [
    CommonModule,
    MatStepperModule
  ],
  exports:[
    MatStepperModule
  ]
})
export class MaterialModule { }
