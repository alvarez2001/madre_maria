import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private sharedSvc:SharedService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.sharedSvc.PaginaCurrent(this.route.snapshot.data.pagina);
  }

}
