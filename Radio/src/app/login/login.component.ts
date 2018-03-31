import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('login-pane', [
      transition('* => *', [
              query(':leave', style({ opacity: 0 }), {optional: true}),

              query(':leave', stagger('300ms', [
                animate('.6s ease-in', keyframes([
                  style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                  style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
                  style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
                ]))]), {optional: true})
    ])
  ]
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
