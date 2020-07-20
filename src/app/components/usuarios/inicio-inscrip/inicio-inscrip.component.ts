import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-inscrip',
  templateUrl: './inicio-inscrip.component.html',
  styles: [
  ]
})
export class InicioInscripComponent implements OnInit {

  current:number = 25
  max:number = 100;
  constructor() { }

  ngOnInit(): void {
  }

  cambioValor(event:any){
    /* console.log(event) */
  }

  aumentar(){
    this.current += 10
  }

}
