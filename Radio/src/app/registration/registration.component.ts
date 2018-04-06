import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

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

    console.log(form.value.username);

    this.router.navigate(['login']);

    // this.http.post("laukiam duombazes",
    //   {
    //     username: form.value.username,
    //     password: form.value.password
    //   }
    //   , httpOptions).subscribe((data) => {});

  }

  redirLogin() {
    this.router.navigate(['login']);
  }
}
