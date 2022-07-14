import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GreetingComponent } from './greeting.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    GreetingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class GreetingModule { }
