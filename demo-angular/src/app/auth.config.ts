import {AuthConfig} from "angular-oauth2-oidc";


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://www.oauth2.com:9000/greeting-oauth2-service/',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'login-client',
  responseType: 'code',
  scope: 'openid profile',
  showDebugInformation: true,
  timeoutFactor: 0.01,
  checkOrigin: false,
};
