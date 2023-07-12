package com.itm94lj.ApiGateway.configuration;

import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

@Configuration
public class SecurityConfig {
    @Bean
    public ReactiveClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryReactiveClientRegistrationRepository(
                this.springClientRegistration()
        );
    }

    private ClientRegistration springClientRegistration() {
        return ClientRegistration.withRegistrationId("spring")
                .clientId("login-client")
                .clientSecret("openid-connect")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .redirectUri("http://www.gateway.com:8777/login/oauth2/code/login-client")
                .scope("openid", "profile")
                .authorizationUri("http://www.oauth2.com:9000/oauth2/authorize")
                .tokenUri("http://www.oauth2.com:9000/oauth2/token")
                .jwkSetUri("http://www.oauth2.com:9000/oauth2/jwks")
                .build();

    }
}
