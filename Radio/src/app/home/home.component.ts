import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

var headers;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private globals: Globals, private http: HttpClient) {
    if (!this.globals['isLogged']) {
      router.navigate(['login']);
    }

    headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ this.globals['accessToken']
    });

  }

  ngOnInit() {

    this.http.post('http://localhost:8000/api/get-details',null,{headers: headers})
      .subscribe(error => {
        if(error['error']=='Unauthorised'){
          this.globals['isLogged'] = false;
          this.router.navigate(['login']);
        }
      });

  }


}
