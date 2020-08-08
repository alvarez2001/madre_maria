import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuariosService } from 'src/app/services/administracion';
import { Router } from '@angular/router';

export interface ModificarUsuario {
  usuario:      number;
  estudiante:   number;
  nombres:      string;
  apellidos:    string;
  nacionalidad: string;
  cedula:       string;
}


@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  providers:[UsuariosService]
})
export class ModificarUsuarioComponent implements OnInit,AfterViewInit {

  formModificar:FormGroup = new FormGroup({});
  infoPasada!:ModificarUsuario;

  cedula:string = '';

  constructor(private usuarioSvc:UsuariosService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {

    this.formModificar = this.fb.group({
      cedula:['',[Validators.required, Validators.minLength(7), Validators.maxLength(20),Validators.pattern('[0-9]+')]]
    })
  }

  ngAfterViewInit(){

  }


  buscarInfo(){
    const formModificar = this.formModificar;
    if(formModificar.valid){
      this.buscarinfoporcedula(formModificar.value)
    }
  }


  private buscarinfoporcedula(cedula:string){
    this.usuarioSvc.buscarInfoPorCedula(cedula).subscribe(res => {
      const dato = JSON.stringify(res)
      sessionStorage.setItem('modificarDato',dato)
      this.router.navigate(['administrador','usuarios','modificar'])
      this.infoPasada = res;
    })
  }
}
