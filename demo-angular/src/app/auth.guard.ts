import {CanActivateFn, Router} from '@angular/router';
import {Injectable, inject} from "@angular/core";
import {OAuthService} from "angular-oauth2-oidc";
import {AuthenticateService} from "../service/authenticate.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticateService);
  const router = inject(Router);
  if (authService.access_token &&
      authService.access_token.length > 0) {
    return true;
  } else {
    authService.loginCode();
    return false;
  }
};
