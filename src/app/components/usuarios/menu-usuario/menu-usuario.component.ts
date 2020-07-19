import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html'
})
export class MenuUsuarioComponent implements OnInit {

  public paginaActual:string = '';


  constructor(private sharedSvc:SharedService, public loginSvc:LoginService) { }

  ngOnInit(): void {
    this.sharedSvc.currentPage.subscribe((actual:string) => this.paginaActual = actual)
  }
  cerrarSession(){
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
  }


}
