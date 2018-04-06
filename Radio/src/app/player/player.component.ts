import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class PlayerComponent implements OnInit {

    public channels: object = [];
    tempDiv: boolean = false;
    tempName: string;

    constructor(private router: Router, private globals: Globals, private http: HttpClient) {

      this.getJSON().subscribe(data => this.channels = data);

      if (!this.globals.isLogged) {
        router.navigate(['login']);
      }

    }

    ngOnInit() {

    }

    showChannel(i) {
      // alert(this.channels[i].name);
      this.tempName = this.channels[i].name;
      this.tempDiv = true;
      setTimeout(() => { this.tempDiv = false; }, 600);
    }

    public getJSON(): Observable<any> {
          return this.http.get("../../assets/channels.json")
    }

}
