import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
declare let $:any;

@Component({
  selector: 'app-modal-inhabilitado',
  templateUrl: './modal-inhabilitado.component.html',
  styleUrls: ['./modal-inhabilitado.component.scss']
})
export class ModalInhabilitadoComponent implements OnInit, OnDestroy {

  @ViewChild('modal')
  modal!: ElementRef;
  constructor(private loginSvc:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.comprobarSistema();
    this.Redirigir();
  }

  ngOnDestroy():void{
    $(this.modal.nativeElement).modal('hide')
  }

  Redirigir(){
    $(this.modal.nativeElement).on('hide.bs.modal',(e:any)=>{
      this.router.navigate(['/'])
    })
  }


  comprobarSistema(){
    this.loginSvc.comprobarStatusSistema().subscribe(res => {
      if(res !== 'true'){

        $(this.modal.nativeElement).modal({
          keyboard:true,
          backdrop:'static'
        })
      }
    })
  }

}
