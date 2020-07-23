import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styles: [
  ]
})
export class UsuariosAdminComponent implements OnInit {

  constructor(private sharedSvc:SharedService, private route:ActivatedRoute) {
    this.sharedSvc.PaginaCurrent(this.route.snapshot.data.pagina)
  }

  ngOnInit(): void {
  }

}
