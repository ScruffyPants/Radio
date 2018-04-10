import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': 'Bearer '//.$accessToken
  })
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})

export class RegistrationComponent implements OnInit {

  constructor(private router: Router,  private http: HttpClient, private globals: Globals) { }

  ngOnInit() {
  }

  onSubmit(form){

    this.http.post('http://localhost:8000/api/register',
      {
        name: 'Boi',
        email: form.value.username,
        password: form.value.password,
        c_password: form.value.c_password
      }, httpOptions).subscribe(res => {
            console.log(res);
            this.globals.isLogged = true;
            this.router.navigate(['home']);
          });

  }

  redirLogin() {
    this.router.navigate(['login']);
  }
}
