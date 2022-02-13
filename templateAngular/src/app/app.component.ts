import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Greeting} from "../greeting/Greeting";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'templateAngular';
  greetingUrl = "http://127.0.0.1:8080/greeting";
  greeting : Greeting;
  constructor(private  http: HttpClient) {
    this.greeting = {id: 1, content: "hello"};
    this.http.get<Greeting>(this.greetingUrl)
      .subscribe((data: Greeting) => {
        console.log("http subscribe id:" + data.id + "content:" + data.content);
          this.greeting = {
            id: data.id,
            content: data.content
          }
      }
        );
  }
}
