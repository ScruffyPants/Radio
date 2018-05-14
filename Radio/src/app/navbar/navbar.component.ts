import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private globals: Globals) { }

  ngOnInit() {
  }

  logOut() {
    this.globals['isLogged'] = false;
    this.globals['channel_token'] = '';
    this.globals['accessToken'] = '';
  }

}
