import { Injectable } from "@angular/core";


@Injectable()
export class Globals {

  public accessToken: string = '';
  public isLogged: boolean = false;
  public channel_token: string = 'Generate token in Profile.'

}
