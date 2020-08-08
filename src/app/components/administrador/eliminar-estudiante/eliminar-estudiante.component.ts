import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/administracion';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-estudiante',
  templateUrl: './eliminar-estudiante.component.html',
  styleUrls: ['./eliminar-estudiante.component.scss'],
  providers:[UsuariosService]
})
export class EliminarEstudianteComponent implements OnInit {

  form:FormGroup = new FormGroup({});

  /* 31602004 */


  constructor(private fb:FormBuilder, private usuarioSvc:UsuariosService,private sharedSvc:SharedService,private route:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      cedula:['',[Validators.required,Validators.minLength(7), Validators.maxLength(20),Validators.pattern('[0-9]+')]]
    });
  }


  Eliminar(){
    const form = this.form;
    if(form.valid){
      this.usuarioSvc.eliminarUsuarioporCedula(form.value.cedula).subscribe(res => {
        this.sharedSvc.mensajeSuccessAlerta(res)
        this.route.navigate(['administrador','usuarios','consultar-usuario'])
      })
    }
  }
}
