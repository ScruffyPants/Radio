import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirHome() {
    this.router.navigate(['home']);
  }

  redirLogin() {
    this.router.navigate(['login']);
  }
}
