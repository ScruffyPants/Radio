import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private globals: Globals) { }

  ngOnInit() {
    this.authService.checkAuth();

    if (this.globals['channel_token']!='Generate token in Profile.'){
      this.channelToken = this.globals['channel_token'];
    }
  }

  onSubmit(form){}

  showRePw() { this.repeatPassword = true }

  showToken() {
    this.channelToken = "loading..."

    // this.http.post('http://localhost:8000/api/get-streamKey',null,{headers: this.authService.checkAuth()})
    //   .subscribe(data => {
    //     this.globals['channel_token'] = data['key'];
    //     this.channelToken = this.globals['channel_token'];
    //   }, (err: HttpErrorResponse) => { console.log(err['error'].message) });
    let promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8000/api/get-streamKey',null,{headers: this.authService.checkAuth()})
        .toPromise()
        .then( res => {
          this.globals['channel_token'] = res['key'];
          this.channelToken = this.globals['channel_token'];
          resolve();
        },
        msg => {
          console.log(msg['error'].message);
          reject(msg);
        }
      );
    });

  }

}
