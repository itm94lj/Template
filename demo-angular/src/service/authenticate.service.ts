import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credentials} from "../entity/Credentials";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  authenticated = false;
  loginUrl = 'http://localhost:8080/token';
  token: string = '';

  constructor(private http: HttpClient) { }

  authenticate(cridentials: Credentials, callback:any) {
    const headers = new HttpHeaders(cridentials ? { authorization: 'Basic ' + btoa(cridentials.username + ':' +cridentials.password) } : {})
    this.http.get(this.loginUrl, {headers: headers})
      .subscribe((response:any) => {
        if (response['token']) {
          this.authenticated = true;
          const token = response['token'];
          this.token = token;
        } else {
          this.authenticated = false;
        }
        console.log('login return:[', this.authenticated, '].');

        return callback && callback();
      });
  }


}

