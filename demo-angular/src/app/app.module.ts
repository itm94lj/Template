import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {XhrInterceptor} from "../service/XhrInterceptor";
import { OAuthModule } from 'angular-oauth2-oidc';
import { SignInComponent } from './sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SpyDirective } from './directive/spy.directive';
import { UnlessDirective } from './directive/unless.directive';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PersonComponent } from './person/person.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {GreetingComponent} from "./greeting/greeting.component";
import {GreetingDetailsComponent} from "./greeting/greeting-details/greeting-details.component";
import {GreetingEditComponent} from "./greeting/greeting-edit/greeting-edit.component";
import { PersonDetailsComponent } from './person/person-details/person-details.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import {RxStompService} from "../service/rx-stomp.service";
import {rxStompServiceFactory} from "../service/rx-stomp-service-factory";
import {AlertModule} from "../ngx-bootstrap/alert/alert.module";
import {AccordionModule} from "../ngx-bootstrap/accordion/accordion.module";
import {ButtonsModule} from "../ngx-bootstrap/buttons/buttons.module";
import {CarouselModule} from "../ngx-bootstrap/carousel/carousel.module";
import {BsDatepickerModule} from "../ngx-bootstrap/datepicker/bs-datepicker.module";
import {BsDropdownModule} from "../ngx-bootstrap/dropdown/bs-dropdown.module";
import {ModalModule} from "../ngx-bootstrap/modal/modal.module";
import {PaginationModule} from "../ngx-bootstrap/pagination/pagination.module";
import {PopoverModule} from "../ngx-bootstrap/popover/popover.module";
import {ProgressbarModule} from "../ngx-bootstrap/progressbar/progressbar.module";
import {RatingModule} from "../ngx-bootstrap/rating/rating.module";
import {TabsModule} from "../ngx-bootstrap/tabs/tabs.module";
import {TooltipModule} from "../ngx-bootstrap/tooltip/tooltip.module";
import {TypeaheadModule} from "../ngx-bootstrap/typeahead/typeahead.module";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    GreetingComponent,
    SpyDirective,
    UnlessDirective,
    GreetingDetailsComponent,
    GreetingEditComponent,
    PersonComponent,
    PersonDetailsComponent,
    PersonEditComponent,
  ],
  imports: [
    BrowserModule,
    AlertModule,
    AccordionModule,
    ButtonsModule,
    CarouselModule,
    BsDatepickerModule,
    BsDropdownModule,
    PaginationModule,
    PopoverModule,
    ProgressbarModule,
    RatingModule,
    TabsModule,
    TooltipModule,
    TypeaheadModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    { provide: RxStompService, useFactory: rxStompServiceFactory },
  ],
  bootstrap: [AppComponent],
  exports: [
    SignInComponent
  ]
})
export class AppModule { }
