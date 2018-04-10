import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Globals } from '../globals';


const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': 'Bearer dT68xqvRdPhTAKl1bMai8TzHQhuAgORRpIJQkX5V'
  })
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})

export class LoginComponent implements OnInit {


  input_usr: string = 'username';
  input_pw: string = 'password';
  constructor(private router: Router, private globals: Globals, private http: HttpClient) { }

  ngOnInit() { }

  onSubmit(form){

    this.http.post('http://localhost:8000/api/login',
      {
        email: form.value.username,
        password: form.value.password
      }, httpOptions).subscribe(res => {
          console.log(res);
          this.globals.isLogged = true;
          this.router.navigate(['home']);
        });

  }
}
