import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';

var headers;

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

      headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ this.globals['accessToken']
      });

      if (!this.globals.isLogged) {
        router.navigate(['login']);
      }

      this.getJSON().subscribe(data => this.genres = data);

    }

    ngOnInit() {

      this.http.post('http://localhost:8000/api/get-details',null,{headers: headers})
        .subscribe(error => {
          if(error['error']=='Unauthorised'){
            this.globals['isLogged'] = false;
            this.router.navigate(['login']);
          }
        });

    }

    onSubmit(form){}

    public getJSON(): Observable<any> {
          return this.http.get("../../assets/genres.json")
    }

}
