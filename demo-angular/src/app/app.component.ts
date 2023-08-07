import {Component, OnInit, TemplateRef} from '@angular/core';
import {GreetingServiceService} from "../service/greeting-service.service";
import {Router, ChildrenOutletContexts} from "@angular/router";
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../config/auth-config";
import {useHash} from "../flags";
import {slideInAnimation} from "../animations/listAnimations";
import {UntypedFormBuilder} from "@angular/forms";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements  OnInit{
  title = 'demo-angular';
  loginFailed: boolean = false;
  userProfile: any;
  
    ngOnInit():void {

    }

    constructor(private greetingService: GreetingServiceService,
              private oauthService: OAuthService,
              private router: Router,
              private contexts: ChildrenOutletContexts,
              private formBuilder: UntypedFormBuilder
  ) {
    this.configureCodeFlow();

    this.oauthService.events
      .subscribe((e) => {
        console.log('app component event type:[', e.type, '].');

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
        console.log('app component oauthService login.');
        if (useHash) {
          this.router.navigate(['/']);
        }})
      ;

    this.oauthService.setupAutomaticSilentRefresh();
  }

  getRouteAnimationData() {
    let currentAnimation = this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    return currentAnimation;
  }
}


