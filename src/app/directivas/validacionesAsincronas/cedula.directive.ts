import { Directive, Input } from '@angular/core';
import {
  NG_ASYNC_VALIDATORS,
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { map, debounceTime } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared/shared.service';

@Directive({
  selector: '[cedula]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: CedulaDirective,
      multi: true,
    },
  ],
})
export class CedulaDirective implements AsyncValidator {
  @Input('cedula') cedula: any;

  constructor(
    private loginSvc: LoginService,
    private sharedSvc: SharedService
  ) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    /*
    nacionalidad_estudiante
    cedula_estudiante
    */

    if (this.cedula.tipo === 'representante') {
      return control.valueChanges.pipe(
        debounceTime(1000),
        map((dat:any) => {
          const data = {
            nacionalidad_representante: this.cedula.nacionalidad,
            cedula_representante: dat,
          };

          return this.verificarCedulaRepre(data)
        })
      )
    }

    if (this.cedula.tipo === 'estudiante') {
      return control.valueChanges.pipe(
        debounceTime(1000),
        map((dat: any) => {

          const data = {
            nacionalidad_estudiante: this.cedula.nacionalidad,
            cedula_estudiante: dat,
          };
          return this.verificarCedula(data)
        })
      );
    }

    throw new Error('Method not implemented.');
  }


  private verificarCedula(data:any){

    this.sharedSvc.lanzarCarga(true);
    return this.loginSvc.verificarCedulaEstudiante(data).pipe(
      map((datas: any) => {
        this.sharedSvc.lanzarCarga(false);
        return datas
      })
    ).subscribe(res => {
      const tipo = typeof res;
      if (tipo === 'object') {
        this.sharedSvc.verificarEstudiante(true);
        return null;
      }
      this.sharedSvc.verificarEstudiante(false);
      return null;
    })
  }


  private verificarCedulaRepre(data:any){
    this.sharedSvc.lanzarCarga(true);
    return this.loginSvc.verificarCedulaRepresentante(data).pipe(
      map((data: any) => {
        this.sharedSvc.lanzarCarga(false);
        return data
      })
    ).subscribe(res => {
      const tipo = typeof res;
        this.sharedSvc.lanzarCarga(false);
        if (tipo === 'object') {
          this.sharedSvc.compartirInfoRepresentante(res);
          this.sharedSvc.verificarRepresentante(true);
          return null;
        }
        this.sharedSvc.verificarRepresentante(false);
        return null;
    })
  }
}



