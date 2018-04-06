import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
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
  username: string = 'user';
  password: string = 'user';
  input_usr: string = 'user';
  input_pw: string = 'user';
  test: string;

  constructor(private router: Router, private globals: Globals) { }

  ngOnInit() {
    console.log(this.globals.isLogged);
  }

  redirHome() {
    if (this.username==this.input_usr&&this.password==this.input_pw) {
      this.globals.isLogged = true;
      console.log(this.globals.isLogged);
      this.router.navigate(['home']);
    }
    else {
      this.input_usr = "";
      this.input_pw = "";
    }
  }

  // onSubmit(form: ngForm){
  // 	console.log(form.value);
  // }

}
