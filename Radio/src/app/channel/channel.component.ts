import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Globals } from '../globals';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class ChannelComponent implements OnInit {

  constructor(private router: Router, private globals: Globals) {
    if (!this.globals.isLogged) {
      router.navigate(['login']);
    }
  }

  ngOnInit() {
  }

}
