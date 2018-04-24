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
  pwError: string;
  successBox: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private globals: Globals) { }

  ngOnInit() {
    this.authService.checkAuth();

    if (this.globals['channel_token']!='Generate token in Profile.'){
      this.channelToken = this.globals['channel_token'];
    }
  }

  onSubmit(form){

    this.http.post('http://localhost:8000/api/change-password',
      {

        new_password: form.value.new_pw,
        c_password: form.value.re_pw,
        password: form.value.old_pw

      }, {headers: this.authService.checkAuth()}).subscribe(res => {

          if (res['success']){
            this.pwError = null;
            this.successBox = true;
            setTimeout(() => { this.successBox = false; }, 1000);
          }

        }, (err: HttpErrorResponse)=> {

          console.log(err['error'].error);
          if (err['error'].error.new_password)
            this.pwError = err['error'].error.new_password;
          else if (err['error'].error.c_password=="The c password field is required.")
            this.pwError = "Please enter the confirmation password.";
          else if (err['error'].error.c_password)
            this.pwError = err['error'].error.c_password;
          else if (err['error'].error.password)
            this.pwError = err['error'].error.password;
    });

  }

  showRePw() { this.repeatPassword = true }

  showToken() {
    this.channelToken = "loading..."

    this.http.post('http://localhost:8000/api/get-streamKey',null,{headers: this.authService.checkAuth()})
      .subscribe(data => {
        this.globals['channel_token'] = data['key'];
        this.channelToken = this.globals['channel_token'];
      }, (err: HttpErrorResponse) => { console.log(err['error'].message) });

  }

}
