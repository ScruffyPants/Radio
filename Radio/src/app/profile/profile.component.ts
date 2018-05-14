import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Globals } from '../globals';

var file;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class ProfileComponent implements OnInit {

  repeatPassword: boolean = false;
  oldPassword: boolean = false;
  channelToken: string = '';
  pwError: string;
  successBox: boolean = false;
  changed_value: string = 'atitude';
  pic_id: string;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private globals: Globals) { }

  ngOnInit() {
    this.authService.checkAuth();

    if (this.globals['channel_token']!='Generate token in Profile.'){
      this.channelToken = this.globals['channel_token'];
    }

    this.http.post('http://localhost:8000/api/getImage',null, {headers: this.authService.checkAuth()})
      .subscribe(res => {
        this.pic_id = res['image'];
        if (!res['image']) this.pic_id = '1525857621.png';
      },
      (err: HttpErrorResponse)=> { this.pic_id = '1525857621.png' });
  }

  onSubmit(form){


    // USERNAME CHANGE
    if (form.value.new_usr) {
      if (form.value.new_usr.length<4) this.pwError = "The new username length must not be less than 4."

      else {
        this.http.post('http://localhost:8000/api/changeInfo',
          {

            new_name: form.value.new_usr,
            password: form.value.old_pw

          }, {headers: this.authService.checkAuth()}).subscribe(res => {
              if (res['error']) this.pwError = res['error'];

              if (res['success']){

                this.pwError = null;
                this.changed_value = 'username';
                this.successBox = true;
                setTimeout(() => { this.successBox = false; }, 1000);

              }

            }, (err: HttpErrorResponse)=> { if(err['error'].error.password) this.pwError = err['error'].error.password; });
        }
    }


    //PASSWORD CHANGE
    else if (form.value.new_pw) {

      if (form.value.new_pw.length<6) this.pwError = "The new password must be longer than 6 characters.";

      else {
        this.http.post('http://localhost:8000/api/changePassword',
          {

            new_password: form.value.new_pw,
            c_password: form.value.re_pw,
            password: form.value.old_pw

          }, {headers: this.authService.checkAuth()}).subscribe(res => {

              if (res['success']){
                this.pwError = null;
                this.changed_value = 'password';
                this.successBox = true;
                setTimeout(() => { this.successBox = false; }, 1000);
              }

            }, (err: HttpErrorResponse)=> {

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
    }


    //IMAGE CHANGE
    // else if (form.value.image) {
    //
    //   console.log(form.value.image)
    //   console.log(file)
    //
    //   this.http.post('http://localhost:8000/api/setImage',
    //     {
    //
    //       image: file
    //
    //     }, {headers: this.authService.checkAuth()}).subscribe(res => { console.log(res); },
    //     (err: HttpErrorResponse)=> { console.log(err['error'].error); }
    //   );
    // }

  }

  // onFileChanged(event) {
  //   //file = (<HTMLInputElement>event.target).files[0];
  //   var fReader = new FileReader();
  //   fReader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
  //   fReader.onloadend = function(event){
  //       file = event.target['result'];
  //   }
  // }

  showOldPw() { this.oldPassword = true }

  showRePw() { this.repeatPassword = true; this.oldPassword = true; }

  showToken() {
    this.channelToken = "loading..."

    this.http.post('http://localhost:8000/api/get-streamKey',null,{headers: this.authService.checkAuth()})
      .subscribe(data => {
        this.globals['channel_token'] = data['key'];
        this.channelToken = this.globals['channel_token'];
      }, (err: HttpErrorResponse) => { console.log(err['error'].message) });

  }

}
