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
  loginFailed: boolean = false;
  userProfile: object;
  login: false;


  constructor(
    private route: ActivatedRoute,
    private oauthService: OAuthService
  ) {
    this.login = false;
    this.userProfile = {};
    }

  get hasValidAccessToken() {
    return this.oauthService.hasValidAccessToken();
  }

  get hasValidIdToken() {
    return this.oauthService.hasValidIdToken();
  }


  ngOnInit():void{
    this.route.params.subscribe((p) => {
      this.login = p['login'];
    });

    this.oauthService.events
      .subscribe((e) => {
        console.log('event type:[', e.type, '].');

        if (e.type === 'token_received') {
          console.debug('state', this.oauthService.state);
          this.oauthService.loadUserProfile().then((up) => this.userProfile = up);
        }
      });
  }

  async loginCode() {
    this.oauthService.configure(authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'code');

    this.oauthService.initLoginFlow('/some-state;p1=1;p2=2?p3=3&p4=4');
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
  }

  loadUserProfile(): void {
    this.oauthService.loadUserProfile().then((up) => this.userProfile = up);
  }

  startAutomaticRefresh(): void {
    this.oauthService.setupAutomaticSilentRefresh();
  }

  stopAutomaticRefresh(): void {
    this.oauthService.stopAutomaticRefresh();
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

  refresh() {
    this.oauthService.oidc = true;

    if (
      !this.oauthService.useSilentRefresh &&
        this.oauthService.responseType === 'code'
    ) {
      this.oauthService
        .refreshToken()
        .then((info) => console.debug('refresh ok', info))
        .catch((err) => console.error('refresh error', err));
    } else {
      this.oauthService
        .silentRefresh()
        .then(info => console.debug('silent referesh ok', info))
        .catch(err => console.error('silent refresh err', err));
    }
  }

  set requestAccessToken(value: boolean) {
    this.oauthService.requestAccessToken = value;
    localStorage.setItem('requestAccessToken', '' + value);
  }

  get requestAccessToken() {
    return typeof(this.oauthService.requestAccessToken) === 'undefined' ? false : this.oauthService.requestAccessToken;
  }

  set useHashLocationStrategy(value: boolean) {
    const oldValue = localStorage.getItem('useHashLocationStrategy') === 'true';
    if (value != oldValue) {
      localStorage.setItem('useHashLocationStrategy', value ? 'true' : 'false');
      window.location.reload();
    }
  }

  get useHashLocationStrategy() {
    return localStorage.getItem('useHashLocationStrategy') === 'true';
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
