import { Component, OnInit, DoCheck, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html'
})
export class MenuUsuarioComponent implements OnInit , DoCheck,AfterViewInit {

  public paginaActual:string = '';
  existeUsuario:boolean = false;
  tipoUsuario:string = '';



  constructor(private sharedSvc:SharedService, public loginSvc:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.sharedSvc.currentPage.subscribe((actual:string) => this.paginaActual = actual)
    this.comprueba();

  }

  ngDoCheck():void{
    this.comprueba()
  }
  ngAfterViewInit():void{

  }



  private comprueba(){
    const usuario:any | null = this.loginSvc.regresarUsuario()

    if(usuario){
      this.existeUsuario = true;
      this.tipoUsuario = usuario.tipo
    }else{
      this.tipoUsuario = '';
      this.existeUsuario = false
    }
  }

  /* sistema/status/inscripcion */

  cerrarSession(){
    Swal.fire({
      icon:'info',
      title:'Desea cerrar sesión?',
      showConfirmButton:true,
      showCancelButton:true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(
      result =>{
        if(result.value){
          this.loginSvc.logoutUsuario().subscribe(res => {
            this.loginSvc.borrarDatos(res);
          })
        }
      }
    )
  }


}
