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

    if (form.value.username.length<3) this.errorMsg = "A username must be at least 3 characters long.";

    else if (form.value.password.length<6) this.errorMsg = "A password must be at least 6 characters long.";

    else this.http.post('http://localhost:8000/api/register',
      {

        username: form.value.username,
        password: form.value.password,
        c_password: form.value.c_password,
        password_hint: form.value.password_hint

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
