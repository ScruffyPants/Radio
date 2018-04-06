import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class ChannelComponent implements OnInit {

    public genres: object = [];

    constructor(private router: Router, private globals: Globals, private http: HttpClient) {

      this.getJSON().subscribe(data => this.genres = data);

      if (!this.globals.isLogged) {
        router.navigate(['login']);
      }

    }

    ngOnInit() {
    }

    public getJSON(): Observable<any> {
          return this.http.get("../../assets/genres.json")
    }

}
