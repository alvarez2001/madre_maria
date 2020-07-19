import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styles: [
  ]
})
export class FormulariosComponent implements OnInit {

  constructor(private sharedSvc:SharedService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.sharedSvc.PaginaCurrent(this.route.snapshot.data.pagina);
  }
}
