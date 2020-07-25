import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from './services/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeModalComponent } from './mensaje-modal/mensaje-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit{
  pantallaCarga:boolean = false;
  constructor(private sharedSvc:SharedService,private cdRef:ChangeDetectorRef,private dialog: MatDialog){}

  ngOnInit(): void {
    this.dialog.open(MensajeModalComponent, {
      maxHeight:'100vh',
      width:'450px',
    });
  }
  ngAfterViewInit(){
    this.sharedSvc.pantallaCarga.subscribe((res:boolean) => {
      this.pantallaCarga = res
      this.cdRef.detectChanges();
    } )
  }

}
