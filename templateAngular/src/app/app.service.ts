import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../signin/User";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  authenticated = false;
  signinUrl = "http://127.0.0.1:8080/hello/user";
  _logoutUrl = "http://127.0.0.1:8080/hello/logout";
  credentials = {username:'', password: ''};

  constructor(private http: HttpClient) { }

  authenticate(credentials:User, callback:any) {
      console.log('Credentials==>username:' + credentials.username+':'+credentials.password);
      this.credentials = credentials;
      const headers = new HttpHeaders(credentials ?
        {
            authorization: 'Basic ' + btoa(credentials.username+':'+credentials.password),
            withCredentials: 'true'
        } : {});

      this.http.get(this.signinUrl, {headers: headers
      })
        .subscribe((response:any) => {
          console.log("login response");
          console.log(response);
          if (response['name']) {
            this.authenticated = true;
          } else {
            this.authenticated = false;
          }
          return callback && callback();
        })
  }

  get logoutUrl():string {
    return this._logoutUrl;
  }

  get basicAuthorization():String {
    return 'Basic '+btoa(this.credentials.username+':'+this.credentials.password);
  }
}
