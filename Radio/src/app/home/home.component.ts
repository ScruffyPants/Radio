import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Globals } from '../globals';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private globals: Globals) {
    if (!this.globals.isLogged) {
      router.navigate(['login']);
    }
  }

  ngOnInit() {
    console.log(this.globals.isLogged);
  }

}
