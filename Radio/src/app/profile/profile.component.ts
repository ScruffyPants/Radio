import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../auth.service';
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
  channelToken: string = '';

  constructor(private router: Router, private authService: AuthService, private globals: Globals) { }

  ngOnInit() { this.authService.checkAuth() }

  onSubmit(form){}

  showRePw() { this.repeatPassword = true }

  showToken() {
    this.globals['channel_token'] = (Math.random().toString(36)+'00000000000000000').slice(2, 12);
    this.channelToken = this.globals['channel_token'];
  }

}
