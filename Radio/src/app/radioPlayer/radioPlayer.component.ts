import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Globals } from '../globals';

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
    spinner: boolean = true;
    old_ch: number = null;
    optGenre: string = null;
    allChannels: any;
    allGenres: any;
    loaded: boolean = false;

    constructor(private router: Router, private http: HttpClient, private globals: Globals, private authService: AuthService) { }

    ngOnInit() {

      this.http.post('http://localhost:8000/api/get-channels',null,{headers: this.authService.checkAuth()})
        .subscribe(data => {

          if (data['server_name']) {
            this.channels = [];
            this.allChannels = [];
            this.channels.push(data);
            this.allChannels.push(data);
          }

          else {
            this.channels = data;
            this.allChannels = data;
          }

          if (!this.allGenres) this.allGenres = [];

          for(let i = 0; i<this.channels.length; i++) {

            if (!this.loaded) this.allGenres.push(this.channels[i].genre);

            if (this.channels[i].server_name == this.globals['channelTitle']){

              if (this.old_ch != null) this.channels[this.old_ch].listeners--;

              this.channels[i].listeners++;
              this.old_ch = i;

            }

            if (this.optGenre && this.optGenre!="any") {

              if (this.optGenre && this.channels[i] != null)

                if (this.channels[i].genre != this.optGenre) {
                  this.channels.splice(i,1);
                  i--;
                }

            }

          }

          setTimeout(() => { this.spinner = false; this.loaded = true; }, 50);
        }, (err: HttpErrorResponse) => { console.log(err['error'].message) });
    }

    chooseChannel(i) {
      if (this.old_ch != null)
        this.channels[this.old_ch].listeners--;

      this.globals['channelTitle'] = this.channels[i].server_name;
      this.globals['listenURL'] = this.channels[i].listenurl;

      this.channels[i].listeners++;
      this.old_ch = i;
    }

    filter() {
      this.ngOnInit();
    }
}
