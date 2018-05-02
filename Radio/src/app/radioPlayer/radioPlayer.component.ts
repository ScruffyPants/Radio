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

    public channels: any;
    tempDiv: boolean = false;
    channelTitle: string = '-';
    spinner: boolean = true;
    listenURL: string = '';
    old_ch: number = null;

    constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

    ngOnInit() {
      this.http.post('http://localhost:8000/api/get-channels',null,{headers: this.authService.checkAuth()})
        .subscribe(data => {

          if (data['server_name']) {
            this.channels = [];
            this.channels.push(data);
            console.log(data['server_name']);
          }

          else this.channels = data;

          setTimeout(() => { this.spinner = false; }, 50);
        }, (err: HttpErrorResponse) => { console.log(err['error'].message) });
    }

    chooseChannel(i) {
      if (this.old_ch != null)
        this.channels[this.old_ch].listeners--;

      this.channelTitle = this.channels[i].server_name;
      this.listenURL = this.channels[i].listenurl;

      this.channels[i].listeners++;
      this.old_ch = i;
    }
}
