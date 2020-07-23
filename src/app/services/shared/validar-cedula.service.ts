import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, debounceTime } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { SharedService } from './shared.service';



@Injectable({
  providedIn: 'root'
})
export class ValidarService {


  constructor(private http:HttpClient,private loginSvc:LoginService, private sharedSvc:SharedService) { }



}

