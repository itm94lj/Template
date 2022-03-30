import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GreetingRoutingModule } from './greeting-routing.module';
import { GreetingComponent } from './greeting.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    GreetingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GreetingRoutingModule
  ]
})
export class GreetingModule { }
