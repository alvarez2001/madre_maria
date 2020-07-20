import { Component, OnInit, DoCheck } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html'
})
export class MenuUsuarioComponent implements OnInit , DoCheck {

  public paginaActual:string = '';
  existeUsuario:boolean = false;

  constructor(private sharedSvc:SharedService, public loginSvc:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.sharedSvc.currentPage.subscribe((actual:string) => this.paginaActual = actual)
    this.comprueba();
  }

  ngDoCheck():void{
    this.comprueba()
  }

  private comprueba(){
    if(this.loginSvc.regresarUsuario()){
      this.existeUsuario = true;
    }else{
      this.existeUsuario = false
    }
  }

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
          this.sharedSvc.lanzarCarga(true)
          setTimeout(()=>{
            this.sharedSvc.lanzarCarga(false)
            this.router.navigate(['/'])
            sessionStorage.removeItem('token')
          sessionStorage.removeItem('usuario')
          sessionStorage.removeItem('estudiante')
          },1200)
        }
      }
    )
  }


}
