import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})

export class RegistrationComponent implements OnInit {

  errorMsg: string = '';

  constructor(private router: Router,  private http: HttpClient, private globals: Globals) { }

  ngOnInit() { }

  onSubmit(form){

    this.http.post('http://localhost:8000/api/register',
      {

        username: form.value.username,
        password: form.value.password,
        c_password: form.value.c_password

      }).subscribe(res => {

            this.globals['accessToken'] = res['success'].token;
            this.globals['isLogged'] = true;
            this.router.navigate(['home']);

          }, (err: HttpErrorResponse)=> {

            this.errorMsg = err['error'].error;

          });

  }

  redirLogin() {
    this.router.navigate(['login']);
  }
}
