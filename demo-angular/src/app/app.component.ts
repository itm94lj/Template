import { Component } from '@angular/core';
import {GreetingServiceService} from "../service/greeting-service.service";
import {Router} from "@angular/router";
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../config/auth-config";
import {useHash} from "../flags";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-angular';
  loginFailed: boolean = false;
  userProfile: any;

  constructor(private greetingService: GreetingServiceService,
              private oauthService: OAuthService,
    private router: Router) {
    this.configureCodeFlow();

    this.oauthService.events
      .subscribe((e) => {
        console.log('event type:[', e.type, '].');

        if (e.type === 'token_received') {
          console.debug('state', this.oauthService.state);
          this.oauthService.loadUserProfile();

          const scopes = this.oauthService.getGrantedScopes();
          console.debug('scopes', scopes);
        }
      });
  }

  private configureCodeFlow() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then((_) => {
        console.log('oauthService login.');
        if (useHash) {
          this.router.navigate(['/']);
        }})
      ;

    this.oauthService.setupAutomaticSilentRefresh();
  }



}


