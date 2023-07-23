import { Injectable } from '@angular/core';
import {Greeting} from "../entity/Greeting";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {AuthenticateService} from "./authenticate.service";

@Injectable({
  providedIn: 'root'
})
export class GreetingServiceService {
  greetingUrl = 'http://localhost:8777/greeting';
  iCount=0;

  constructor(private http: HttpClient, private authService: AuthenticateService) { }

  getGreeting() {
    // const headers =  new HttpHeaders().set('X-Auth-Token', this.authService.token);
    const headers = new HttpHeaders( { authorization: 'Basic ' + btoa('itm94lj' + ':' +'password') ,
      'Cache-Control': 'no-cache'} );
    this.iCount = this.iCount + 1;
    // +'?iCount='+this.iCount
    return this.http.get<Greeting>(this.greetingUrl+'?iCount='+this.iCount, {headers: headers});
  }
}
