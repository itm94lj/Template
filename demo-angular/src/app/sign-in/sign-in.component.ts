import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {ActivatedRoute} from "@angular/router";
import {authCodeFlowConfig} from "../../config/auth-config";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements  OnInit {
  userProfile: object;
  access_token_timeout;

  constructor(
    private route: ActivatedRoute,
    private oauthService: OAuthService
  ) {
    this.userProfile = {};
    this.access_token_timeout = true;
    //try lo
    }

  get hasValidAccessToken() {
    return this.oauthService.hasValidAccessToken();
  }

  get hasValidIdToken() {
    return this.oauthService.hasValidIdToken();
  }


  ngOnInit():void{
    this.route.params.subscribe((p) => {
    });

    this.oauthService.events
      .subscribe((e) => {
        console.log('signin component event type:[', e.type, '].');

        if (e.type === 'token_received') {
          console.debug('state', this.oauthService.state);
          this.oauthService.loadUserProfile();
        }
      });

    this.checkLoginState();
    this.oauthService.setupAutomaticSilentRefresh();
  }

  async checkLoginState() {
    this.oauthService.configure(authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'code');

    const timeout = new Promise((res) => setTimeout(() => {
      if (this.access_token && this.access_token.length > 0)
      {
        console.log('access_token:', this.access_token);
        this.oauthService.loadUserProfile().then(
          (up) => {
            this.userProfile = up;
            console.log('update user Profile:', this.userProfile);
          });
      } else {
        this.loginCode();
      }

    }, 1000));
  }

  async loginCode() {
    this.oauthService.initLoginFlow('/some-state;p1=1;p2=2?p3=3&p4=4');
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
  }

  get givenName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'] || claims['sub'];
  }

  get familyName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['family_name'];
  }


  set requestAccessToken(value: boolean) {
    this.oauthService.requestAccessToken = value;
    localStorage.setItem('requestAccessToken', '' + value);
  }

  get requestAccessToken() {
    return typeof(this.oauthService.requestAccessToken) === 'undefined' ? false : this.oauthService.requestAccessToken;
  }

  get id_token() {
    return this.oauthService.getIdToken();
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }

  get id_token_expiration() {
    return this.oauthService.getIdTokenExpiration();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }
 }
