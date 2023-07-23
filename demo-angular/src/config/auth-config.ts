/**
 * Created by fenggu on 2023/7/15.
 */
import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = <AuthConfig>{
  issuer: 'http://www.oauth2.com:9000/greeting-oauth2-service/',
  redirectUri: window.location.origin,
  clientId: 'login-client',
  dummyClientSecret: 'openid-connect',
  responseType: 'code',
  scope: 'openid profile',
  showDebugInformation: true,
  timeoutFactor: 0.01,
  requireHttps: false,
  skipIssuerCheck: true,
  strictDiscoveryDocumentValidation: false,
  clearHashAfterLogin: true,
  useHttpBasicAuth: true
};
