import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  pantallaCarga:boolean = false;
  constructor(private sharedSvc:SharedService){}

  ngOnInit(): void {
    this.sharedSvc.pantallaCarga.subscribe((res:boolean) => this.pantallaCarga = res )
  }

}
