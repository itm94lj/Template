import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Greeting} from "../greeting/Greeting";
import {AppService} from "./app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'templateAngular';
  greeting : Greeting;
  constructor(private  http: HttpClient,
              private app: AppService,
              private router: Router) {
    this.greeting = {id: 0, content: "static hello"};
  }

  logout() {
    this.http.get(this.app._logoutUrl, {})
      .subscribe((response: any) => {
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
      })

  }
}
