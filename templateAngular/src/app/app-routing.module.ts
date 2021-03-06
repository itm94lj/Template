import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SigninComponent} from "../signin/signin.component";
import {GreetingComponent} from "../greeting/greeting.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: SigninComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'greeting', component: GreetingComponent},
  {path: '**', component: SigninComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
