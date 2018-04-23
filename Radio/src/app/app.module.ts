import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { radioPlayerComponent } from './radioPlayer/radioPlayer.component';
import { createChannelComponent } from './createChannel/createChannel.component'
import { ErrorMsgComponent } from './error-msg/error-msg.component';

import { AuthService } from './auth.service';
import { Globals } from './globals';
import { audioBoxComponent } from './audioBox/audioBox.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RegistrationComponent,
    ProfileComponent,
    SearchComponent,
    radioPlayerComponent,
    createChannelComponent,
    ErrorMsgComponent,
    audioBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgHttpLoaderModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ Globals, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
