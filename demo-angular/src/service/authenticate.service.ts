import { Injectable } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../config/auth-config";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private oauthService: OAuthService) {
    console.log('AuthenticateService constructor invoked');
  }

  async loginCode() {
    this.oauthService.configure(authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'code');

    this.oauthService.initLoginFlow('/some-state;p1=1;p2=2?p3=3&p4=4');
    this.oauthService.setupAutomaticSilentRefresh();
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }
}

