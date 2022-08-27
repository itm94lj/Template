import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Greeting} from "./Greeting";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GreetingService {
  socket: any;
  allGreetings:Array<Greeting> = [];
  serviceUrl = 'http://127.0.0.1:8080/hello/';

  constructor(private  http: HttpClient,) {
    this.socket = io("http://127.0.0.1:9092");
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log("socket connected");
    });
    this.socket.on("disconnect", ()=> {
      console.log("socket disconnected");
    });
    console.log("socket connected:[" + this.socket.connected + "];");
  }

  subscribeToAddGreeting(onAddGreeting: any) {
    this.socket.on('addGreeting', (greeting: Greeting)=> {
      console.log("addGreeting event received.");
      console.log(greeting);
      onAddGreeting(greeting);
    });
  }

  subscribeToDelGreeting(onDelGreeting: any) {
    this.socket.on('delGreeting', (greeting: Greeting)=> {
      console.log('delGreeting event received.');
      console.log(greeting);
      onDelGreeting(greeting);
    })
  }

  public getGreet(): void {
    console.log("get greet invoked in service.");
    this.http.get<Greeting>(this.serviceUrl + "greeting").subscribe(
      (greeting: Greeting)=>{
        console.log("get greeting");
        console.log(greeting);
      }
    );
  }

  public  deleteGreet(id: number): void {
    const options = {params: new HttpParams().set('id', id)};
    this.http.delete<Greeting>(this.serviceUrl + "greeting", options).subscribe(
      (greeting: Greeting) => {
        console.log("greeting delete success");
        console.log(greeting);
      }
    )
  }

  public getGreetings(): Observable<Greeting[]> {
    return this.http.get<Array<Greeting>>(this.serviceUrl+"allgreetings");
  }
}
