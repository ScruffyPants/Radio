import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Globals } from './globals';
import { Router } from '@angular/router';


let headers;
@Injectable()
export class AuthService {

  constructor(private router: Router, private globals: Globals, private http: HttpClient){}

  checkAuth() {
    headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ this.globals['accessToken']
    });

    this.globals['isLogged'] = true;

    this.http.post('http://localhost:8000/api/get-details',null,{headers: headers})
      .subscribe(data => { },
        (err: HttpErrorResponse) => {
          if(err['status']==401){
            this.globals['isLogged'] = false;
            this.router.navigate(['login']);
            alert(err['error'].message+"\nUser's session has been ended.")
        }
      });

    return headers;
  }

}
