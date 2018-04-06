import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})

export class LoginComponent implements OnInit {

  isHidden: boolean = true;
  input_usr: string = 'username';
  input_pw: string = 'password';
  test: string;
  users: object = [];

  constructor(private router: Router, private globals: Globals, private http: HttpClient) {

    this.getJSON().subscribe(data => {this.users = data;});

  }

  ngOnInit() {
    console.log(this.globals.isLogged);
  }

  onSubmit(form){

    let correct = 0;

    for( let user in this.users ){
      if ( this.users[user].username == form.value.username &&
        this.users[user].password == form.value.password )
          {
            this.globals.isLogged = true;
            correct = 1;
            this.router.navigate(['home']);
          }
    }

    if ( this.globals.isLogged == false && correct == 0 ){
      this.input_usr = "";
      this.input_pw = "";
      alert("Bad credentials");
    }
  }

  public getJSON(): Observable<any> {
        return this.http.get("../../assets/users.json")
  }

}
