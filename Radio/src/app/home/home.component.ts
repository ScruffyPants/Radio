import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Globals } from '../globals';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class HomeComponent implements OnInit {

  channels: any;
  channelFound: any;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private globals: Globals) { }

  ngOnInit() {
    this.authService.checkAuth();

    this.http.post('http://localhost:8000/api/get-channels',null,{headers: this.authService.checkAuth()})
      .subscribe(data => {

        if (data['server_name']) {
          this.channels = [];
          this.channels.push(data);
        }

        else this.channels = data;

        for(let i = 0; i<this.channels.length; i++) {

          if (this.channels[i].recommended){
            if (!this.channelFound) this.channelFound = [];
            this.channelFound.push(this.channels[i]);
          }
        }

        //setTimeout(() => { this.spinner = false; }, 50);
      }, (err: HttpErrorResponse) => { console.log(err['error'].message) });

  }

  chooseChannel(i) {
    this.globals['channelTitle'] = this.channelFound[i].server_name;
    this.globals['listenURL'] = this.channelFound[i].listenurl;
    this.router.navigate(['player']);
  }

}
