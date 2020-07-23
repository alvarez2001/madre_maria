import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensaje-modal',
  templateUrl: './mensaje-modal.component.html',
  styles: [
  ]
})
export class MensajeModalComponent implements OnInit {

  numeroAleatorio:number;

  constructor() {
    this.numeroAleatorio = Math.round(Math.random()*42);
    if(this.numeroAleatorio === 0){
      this.numeroAleatorio = 1;
    }
  }

  ngOnInit(): void {
    console.log(this.numeroAleatorio)

  }

}
