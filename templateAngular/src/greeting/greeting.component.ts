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
  greetingUrl = 'http://localhost:8080/hello/greeting';
  constructor(private app: AppService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Greeting>(this.greetingUrl).subscribe(
      (data: Greeting) => {
        console.log('get greeting data.' + data);
        this.greeting = data;
      }
    );
  }

  authenticated() {
    console.log('current authenticated state:' + this.app.authenticated);
    return this.app.authenticated;
  };

}
