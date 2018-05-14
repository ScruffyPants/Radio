import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class SearchComponent implements OnInit {

  public channels: any;
  channelFound: any;
  constructor(private router: Router, private http: HttpClient, private globals: Globals, private authService: AuthService) { }

  ngOnInit() { this.authService.checkAuth() }

  search(form) {
    this.channelFound = null;

    this.http.post('http://localhost:8000/api/get-channels',null,{headers: this.authService.checkAuth()})
      .subscribe(data => {

        if (data['server_name']) {
          this.channels = [];
          this.channels.push(data);
        }

        else this.channels = data;

        let found = false;
        for(let i = 0; i<this.channels.length; i++) {

          let substring = form.value.searchKey;

          if (this.channels[i].server_name.includes(substring) || this.channels[i].server_description.includes(substring)){
            if (!this.channelFound) this.channelFound = [];
            this.channelFound.push(this.channels[i]);
            found = true;
          }
        }
        if (!found) alert("No results found.");


        //setTimeout(() => { this.spinner = false; }, 50);
      }, (err: HttpErrorResponse) => { console.log(err['error'].message) });
  }

  chooseChannel(i) {
    this.globals['channelTitle'] = this.channelFound[i].server_name;
    this.globals['listenURL'] = this.channelFound[i].listenurl;
    this.router.navigate(['player']);
  }

}
