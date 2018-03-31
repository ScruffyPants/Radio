import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})

export class LoginComponent implements OnInit {

  username: string = 'user';
  password: string = 'user';
  input_usr: string;
  input_pw: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirHome() {
    if (this.username==this.input_usr&&this.password==this.input_pw)
      this.router.navigate(['home']);
    else {
      this.input_usr = "";
      this.input_pw = "";
    }
  }

}
