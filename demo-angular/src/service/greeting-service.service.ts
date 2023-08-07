import { Injectable } from '@angular/core';
import {Greeting} from "../entity/Greeting";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {AuthenticateService} from "./authenticate.service";
import {GREETINGS} from "../mock/greeting_mock";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GreetingServiceService {
  greetingUrl = 'http://localhost:4200/greeting-service/greeting';
  iCount=0;
  greetings = GREETINGS;

  constructor(private http: HttpClient) { }

  getGreeting() {
    this.iCount = this.iCount + 1;
    return this.http.get<Greeting>(this.greetingUrl+'?iCount='+this.iCount);
  }

  getGreetings() {
    const greetings = of(this.greetings);

    return greetings;
  }

  addGreeting(newGreet: Greeting) {
    this.greetings.push(newGreet);
  }
}
