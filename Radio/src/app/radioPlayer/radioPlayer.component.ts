import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './radioPlayer.component.html',
  styleUrls: ['./radioPlayer.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class radioPlayerComponent implements OnInit {

    public channels: object = [];
    tempDiv: boolean = false;
    channelTitle: string = '-';
    spinner: boolean = true;

    constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

    ngOnInit() {
      this.http.post('http://localhost:8000/api/get-channels',null,{headers: this.authService.checkAuth()})
        .subscribe(data => {
          this.channels = data['data'];
          setTimeout(() => { this.spinner = false; }, 50);
        }, (err: HttpErrorResponse) => { console.log(err['error'].message) });
    }

    chooseChannel(i) {
      this.channelTitle = this.channels[i].name;
    }
}
