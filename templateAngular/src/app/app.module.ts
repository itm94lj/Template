import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS, HttpClient,
  HttpClientModule,
  HttpClientXsrfModule,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {GreetingModule} from "../greeting/greeting.module";
import {SigninModule} from "../signin/signin.module";
import {Router, RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {AppService} from "./app.service";


@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  constructor(private app: AppService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const xhr = req.clone({
      headers: req.headers
        .set('X-Requested-With', 'XMLHttpRequest')
        // .set('authorization', this.app.basicAuthorization.toString())
      ,
      withCredentials: true
    });
    console.log('XhrInterceptor invoked.');
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GreetingModule,
    SigninModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header'
    })
  ],
  providers: [AppService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

