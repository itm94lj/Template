import { Component, OnInit } from '@angular/core';
import {AppService} from "../app/app.service";
import {HttpClient} from "@angular/common/http";
import {Greeting} from "./Greeting";

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit {
  title    = "Greeting";
  greeting = {id: 0, content: 'HelloWorld'};
  greetingUrl = 'http://127.0.0.1:8080/greeting';
  constructor(private app: AppService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Greeting>(this.greetingUrl, {withCredentials:true}).subscribe(
      (data: Greeting) => {
        this.greeting = data;
      }
    );
  }

  authenticated() {
    return this.app.authenticated;
  };

}
