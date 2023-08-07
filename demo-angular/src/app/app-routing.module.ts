import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {authGuard} from "./auth.guard";
import {PersonComponent} from "./person/person.component";
import {GreetingComponent} from "./greeting/greeting.component";
import {GreetingEditComponent} from "./greeting/greeting-edit/greeting-edit.component";
import {PersonEditComponent} from "./person/person-edit/person-edit.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SignInComponent,
    data: { animation: 'SignInPage'}
  },
  {
    path: 'greet',
    component: GreetingComponent,
    canActivate: [authGuard],
    data: { animation: 'GreetPage'},
  },
  {
    path: 'editgreet',
    component: GreetingEditComponent,
    canActivate: [authGuard],
    data: { animation: 'GreetEditPage'},
  },
  {
    path: 'person',
    component: PersonComponent,
    canActivate: [authGuard],
    data: { animation: 'PersonPage' }
  },
  {
    path: 'editperson',
    component: PersonEditComponent,
    canActivate: [authGuard],
    data: { animation: 'PersonEditPage' }
  },
  {
    path: '**',
    redirectTo: 'signin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
