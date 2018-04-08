import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Globals } from '../globals';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class ProfileComponent implements OnInit {

  repeatPassword: boolean = false;

  constructor(private router: Router, private globals: Globals) {
    if (!this.globals.isLogged) {
      router.navigate(['login']);
    }
  }

  ngOnInit() {
  }

  onSubmit(form){}

  showRePw() {

    this.repeatPassword = true;

  }

}
